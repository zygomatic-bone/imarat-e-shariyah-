import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { eq, desc } from "drizzle-orm";
import { db } from "../db";
import {
  newsArticlesTable, noticesTable,
  leadershipMembersTable, branchesTable, darulQazaJudgesTable,
  contactMessagesTable,
} from "../db";

const router: IRouter = Router();

/* ── Auth middleware ── */
const ADMIN_TOKEN = process.env.ADMIN_PASSWORD ?? process.env.SESSION_SECRET ?? "admin1234";

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers["x-admin-token"] as string | undefined;
  if (!auth || auth !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

/* ── Verify token ── */
router.post("/admin/verify", (req, res) => {
  const { token } = req.body as { token?: string };
  if (token === ADMIN_TOKEN) return res.json({ ok: true });
  res.status(401).json({ ok: false, error: "Invalid password" });
});

/* ─────────── NEWS ARTICLES ─────────── */
router.get("/admin/news", requireAdmin, async (_req, res) => {
  const items = await db.select().from(newsArticlesTable).orderBy(desc(newsArticlesTable.publishedAt));
  res.json({ items });
});

router.post("/admin/news", requireAdmin, async (req, res) => {
  const body = req.body;
  const [item] = await db.insert(newsArticlesTable).values({
    title:       body.title,
    titleUrdu:   body.titleUrdu   ?? "",
    titleKn:     body.titleKn     ?? "",
    excerpt:     body.excerpt     ?? "",
    excerptUrdu: body.excerptUrdu ?? "",
    content:     body.content     ?? "",
    tag:         body.tag         ?? "General",
    isPublished: body.isPublished ?? true,
    publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
  }).returning();
  res.status(201).json(item);
});

router.put("/admin/news/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  const [item] = await db.update(newsArticlesTable).set({
    title:       body.title,
    titleUrdu:   body.titleUrdu   ?? "",
    titleKn:     body.titleKn     ?? "",
    excerpt:     body.excerpt     ?? "",
    excerptUrdu: body.excerptUrdu ?? "",
    content:     body.content     ?? "",
    tag:         body.tag         ?? "General",
    isPublished: body.isPublished ?? true,
    publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
    updatedAt:   new Date(),
  }).where(eq(newsArticlesTable.id, id)).returning();
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.delete("/admin/news/:id", requireAdmin, async (req, res) => {
  await db.delete(newsArticlesTable).where(eq(newsArticlesTable.id, Number(req.params.id)));
  res.json({ ok: true });
});

/* ─────────── NOTICES ─────────── */
router.get("/admin/notices", requireAdmin, async (_req, res) => {
  const items = await db.select().from(noticesTable).orderBy(desc(noticesTable.publishedAt));
  res.json({ items });
});

router.post("/admin/notices", requireAdmin, async (req, res) => {
  const body = req.body;
  const [item] = await db.insert(noticesTable).values({
    title:       body.title,
    titleUrdu:   body.titleUrdu ?? "",
    content:     body.content   ?? "",
    tag:         body.tag       ?? "Notice",
    isPublished: body.isPublished ?? true,
    publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
  }).returning();
  res.status(201).json(item);
});

router.put("/admin/notices/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  const [item] = await db.update(noticesTable).set({
    title:       body.title,
    titleUrdu:   body.titleUrdu ?? "",
    content:     body.content   ?? "",
    tag:         body.tag       ?? "Notice",
    isPublished: body.isPublished ?? true,
    publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
  }).where(eq(noticesTable.id, id)).returning();
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.delete("/admin/notices/:id", requireAdmin, async (req, res) => {
  await db.delete(noticesTable).where(eq(noticesTable.id, Number(req.params.id)));
  res.json({ ok: true });
});

/* ─────────── LEADERSHIP ─────────── */
router.get("/admin/leadership", requireAdmin, async (_req, res) => {
  const items = await db.select().from(leadershipMembersTable).orderBy(leadershipMembersTable.sortOrder);
  res.json({ items });
});

router.post("/admin/leadership", requireAdmin, async (req, res) => {
  const body = req.body;
  const [item] = await db.insert(leadershipMembersTable).values({
    name:      body.name,
    nameUrdu:  body.nameUrdu  ?? "",
    role:      body.role,
    roleUrdu:  body.roleUrdu  ?? "",
    section:   body.section,
    bio:       body.bio       ?? "",
    bioUrdu:   body.bioUrdu   ?? "",
    sortOrder: body.sortOrder ?? 0,
    isActive:  body.isActive  ?? true,
  }).returning();
  res.status(201).json(item);
});

router.put("/admin/leadership/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  const [item] = await db.update(leadershipMembersTable).set({
    name:      body.name,
    nameUrdu:  body.nameUrdu  ?? "",
    role:      body.role,
    roleUrdu:  body.roleUrdu  ?? "",
    section:   body.section,
    bio:       body.bio       ?? "",
    bioUrdu:   body.bioUrdu   ?? "",
    sortOrder: body.sortOrder ?? 0,
    isActive:  body.isActive  ?? true,
  }).where(eq(leadershipMembersTable.id, id)).returning();
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.delete("/admin/leadership/:id", requireAdmin, async (req, res) => {
  await db.delete(leadershipMembersTable).where(eq(leadershipMembersTable.id, Number(req.params.id)));
  res.json({ ok: true });
});

/* ─────────── BRANCHES ─────────── */
router.get("/admin/branches", requireAdmin, async (_req, res) => {
  const items = await db.select().from(branchesTable).orderBy(branchesTable.sortOrder);
  res.json({ items });
});

router.post("/admin/branches", requireAdmin, async (req, res) => {
  const body = req.body;
  const [item] = await db.insert(branchesTable).values({
    city:        body.city,
    cityUrdu:    body.cityUrdu    ?? "",
    cityKn:      body.cityKn      ?? "",
    address:     body.address,
    phone:       body.phone       ?? "",
    description: body.description ?? "",
    isActive:    body.isActive    ?? true,
    sortOrder:   body.sortOrder   ?? 0,
  }).returning();
  res.status(201).json(item);
});

router.put("/admin/branches/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  const [item] = await db.update(branchesTable).set({
    city:        body.city,
    cityUrdu:    body.cityUrdu    ?? "",
    cityKn:      body.cityKn      ?? "",
    address:     body.address,
    phone:       body.phone       ?? "",
    description: body.description ?? "",
    isActive:    body.isActive    ?? true,
    sortOrder:   body.sortOrder   ?? 0,
  }).where(eq(branchesTable.id, id)).returning();
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.delete("/admin/branches/:id", requireAdmin, async (req, res) => {
  await db.delete(branchesTable).where(eq(branchesTable.id, Number(req.params.id)));
  res.json({ ok: true });
});

/* ─────────── JUDGES ─────────── */
router.get("/admin/judges", requireAdmin, async (_req, res) => {
  const items = await db.select().from(darulQazaJudgesTable).orderBy(darulQazaJudgesTable.sortOrder);
  res.json({ items });
});

router.post("/admin/judges", requireAdmin, async (req, res) => {
  const body = req.body;
  const [item] = await db.insert(darulQazaJudgesTable).values({
    name:      body.name,
    nameUrdu:  body.nameUrdu  ?? "",
    role:      body.role,
    roleUrdu:  body.roleUrdu  ?? "",
    since:     body.since     ?? "",
    sortOrder: body.sortOrder ?? 0,
    isActive:  body.isActive  ?? true,
  }).returning();
  res.status(201).json(item);
});

router.put("/admin/judges/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  const [item] = await db.update(darulQazaJudgesTable).set({
    name:      body.name,
    nameUrdu:  body.nameUrdu  ?? "",
    role:      body.role,
    roleUrdu:  body.roleUrdu  ?? "",
    since:     body.since     ?? "",
    sortOrder: body.sortOrder ?? 0,
    isActive:  body.isActive  ?? true,
  }).where(eq(darulQazaJudgesTable.id, id)).returning();
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.delete("/admin/judges/:id", requireAdmin, async (req, res) => {
  await db.delete(darulQazaJudgesTable).where(eq(darulQazaJudgesTable.id, Number(req.params.id)));
  res.json({ ok: true });
});

/* ─────────── CONTACT MESSAGES ─────────── */
router.get("/admin/messages", requireAdmin, async (_req, res) => {
  const items = await db.select().from(contactMessagesTable).orderBy(desc(contactMessagesTable.createdAt));
  res.json({ items });
});

router.put("/admin/messages/:id/read", requireAdmin, async (req, res) => {
  const [item] = await db.update(contactMessagesTable)
    .set({ isRead: true })
    .where(eq(contactMessagesTable.id, Number(req.params.id)))
    .returning();
  res.json(item);
});

router.delete("/admin/messages/:id", requireAdmin, async (req, res) => {
  await db.delete(contactMessagesTable).where(eq(contactMessagesTable.id, Number(req.params.id)));
  res.json({ ok: true });
});

export default router;
