import { Router, type IRouter } from "express";
import healthRouter from "./health";
import newsRouter from "./news";
import leadershipRouter from "./leadership";
import branchesRouter from "./branches";
import contactRouter from "./contact";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(newsRouter);
router.use(leadershipRouter);
router.use(branchesRouter);
router.use(contactRouter);
router.use(adminRouter);

export default router;
