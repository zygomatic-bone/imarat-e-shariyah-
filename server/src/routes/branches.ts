import { Router, type IRouter } from "express";
import { eq, asc } from "drizzle-orm";
import { db, branchesTable, darulQazaJudgesTable } from "../db";

const router: IRouter = Router();

router.get("/branches", async (_req, res) => {
  const items = await db
    .select()
    .from(branchesTable)
    .where(eq(branchesTable.isActive, true))
    .orderBy(asc(branchesTable.sortOrder));

  res.json({ items });
});

router.get("/judges", async (_req, res) => {
  const items = await db
    .select()
    .from(darulQazaJudgesTable)
    .where(eq(darulQazaJudgesTable.isActive, true))
    .orderBy(asc(darulQazaJudgesTable.sortOrder));

  res.json({ items });
});

export default router;
