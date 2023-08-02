import express from "express";
import { allMessages, sendMessage } from "../controllers/messageControllers";
import checkAuth from "../middleware/checkAuth";

const router = express.Router();

router.route("/:chatId").get(checkAuth, allMessages);
router.route("/").post(checkAuth, sendMessage);

export const messageRoute = router;