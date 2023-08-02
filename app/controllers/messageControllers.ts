import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Chat from "../models/chatModel";
import User from '../models/user.model';
import Message from '../models/messageModel';



//@description     Get all Messages
//@route           GET /api/v1/Message/:chatId
//@access          Protected

const allMessages = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name pic email")
            .populate("chat");
        res.json(messages);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

//@description     Create New Message
//@route           POST /api/v1/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        res.sendStatus(400);
    }

    let { user }: any = req
    let newMessage = {
        sender: user._id,
        content: content,
        chat: chatId,
    };

    try {
        const message = await Message.create(newMessage);

        // Populate the necessary fields directly on the Mongoose document.
        await message.populate("sender", "full_name");
        await message.populate("chat");
        await User.populate(message, {
            path: "chat.users",
            select: "full_name email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

        res.json(message);
    } catch (error: any) {
        res.status(400);
        throw new Error(error.message);
    }
});

export { allMessages, sendMessage };