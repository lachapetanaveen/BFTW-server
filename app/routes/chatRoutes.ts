import express from "express";
import { accessChat, fetchChats } from "../controllers/chatControllers";
import checkAuth from "../middleware/checkAuth";


const router = express.Router();

router.route("/").post(checkAuth, accessChat);
router.route("/").get(checkAuth, fetchChats);

export const chatRoute = router;
