import express from "express";
import { createChat, fetchChats } from "../controllers/chatControllers";
import checkAuth from "../middleware/checkAuth";


const router = express.Router();

router.route("/create").post(checkAuth, createChat);
router.route("/").get(checkAuth, fetchChats);

export const chatRoute = router;
