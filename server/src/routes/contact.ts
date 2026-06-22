import { Router, type IRouter } from "express";
import { db } from "../db";
import { contactMessagesTable } from "../db";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body as { name?: string; email?: string; message?: string };

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "name, email and message are required" });
  }

  const [row] = await db.insert(contactMessagesTable).values({
    name:    name.trim(),
    email:   email.trim(),
    message: message.trim(),
  }).returning();

  res.status(201).json({ ok: true, id: row.id });
});

export default router;
