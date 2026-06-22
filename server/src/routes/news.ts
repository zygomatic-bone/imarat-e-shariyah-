import { Router, type IRouter } from "express";
import { eq, desc, and, sql } from "drizzle-orm";
import { db } from "../db";
import { newsArticlesTable, noticesTable } from "../db";

const router: IRouter = Router();

/* ── News Articles ── */
router.get("/news", async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 20, 100);
  const offset = Number(req.query.offset) || 0;
  const tag = req.query.tag as string | undefined;

  const where = tag
    ? and(eq(newsArticlesTable.isPublished, true), eq(newsArticlesTable.tag, tag))
    : eq(newsArticlesTable.isPublished, true);

  const [items, countResult] = await Promise.all([
    db
      .select()
      .from(newsArticlesTable)
      .where(where)
      .orderBy(desc(newsArticlesTable.publishedAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(newsArticlesTable)
      .where(where),
  ]);

  res.json({ items, total: countResult[0]?.count ?? 0 });
});

router.get("/news/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  const [article] = await db
    .select()
    .from(newsArticlesTable)
    .where(and(eq(newsArticlesTable.id, id), eq(newsArticlesTable.isPublished, true)));

  if (!article) return res.status(404).json({ error: "Article not found" });
  res.json(article);
});

/* ── Notices ── */
router.get("/notices", async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 20, 100);
  const offset = Number(req.query.offset) || 0;

  const [items, countResult] = await Promise.all([
    db
      .select()
      .from(noticesTable)
      .where(eq(noticesTable.isPublished, true))
      .orderBy(desc(noticesTable.publishedAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(noticesTable)
      .where(eq(noticesTable.isPublished, true)),
  ]);

  res.json({ items, total: countResult[0]?.count ?? 0 });
});

router.get("/notices/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  const [notice] = await db
    .select()
    .from(noticesTable)
    .where(and(eq(noticesTable.id, id), eq(noticesTable.isPublished, true)));

  if (!notice) return res.status(404).json({ error: "Notice not found" });
  res.json(notice);
});

export default router;
