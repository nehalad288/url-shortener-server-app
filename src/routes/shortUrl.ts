import express from "express";
import {createUrl, getAllUrl, getUrl, deleteUrl} from "../controllers/shortUrl";
import { createUser, validateUser } from "../controllers/account";
import { urlRateLimiter } from "../helpers/middleware";

const router = express.Router();

router.post("/shortUrl", urlRateLimiter, createUrl);
router.get("/shortUrl/user/:id", getAllUrl);
router.get("/shortUrl/:id", getUrl);
router.delete("/shortUrl/:id", deleteUrl);
router.post("/signup", createUser);
router.post("/login", validateUser);
export default router;
