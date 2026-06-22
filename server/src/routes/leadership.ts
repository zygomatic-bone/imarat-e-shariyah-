import { Router, type IRouter } from "express";
import { eq, and, asc } from "drizzle-orm";
import { db, leadershipMembersTable } from "../db";

const router: IRouter = Router();

router.get("/leadership", async (req, res) => {
  const section = req.query.section as "majlis" | "sabiq" | "arkan" | "umumi" | undefined;

  const validSections = ["majlis", "sabiq", "arkan", "umumi"] as const;

  const where =
    section && (validSections as readonly string[]).includes(section)
      ? and(
          eq(leadershipMembersTable.isActive, true),
          eq(leadershipMembersTable.section, section),
        )
      : eq(leadershipMembersTable.isActive, true);

  const items = await db
    .select()
    .from(leadershipMembersTable)
    .where(where)
    .orderBy(asc(leadershipMembersTable.sortOrder));

  res.json({ items });
});

export default router;
