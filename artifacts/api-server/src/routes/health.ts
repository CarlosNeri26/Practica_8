import { Router } from "express";

const router = Router();

router.get("/", (req: any, res: any) => {
  res.status(200).send("OK");
});

export default router;
