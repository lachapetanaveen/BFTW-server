import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Chat from "../models/chatModel";
import User from '../models/user.model';


//@description     Create or fetch One to One Chat
//@route           POST /api/v1/chat/
//@access          Protected
const createChat = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.body;
    let { user }: any = req
    console.log('userId', userId)
    if (!userId) {
        console.log("UserId param not sent with request");
        res.sendStatus(400);
    }
    try {
        // const isChat = await Chat.find({
        //     isGroupChat: false,
        //     $and: [
        //         { users: { $elemMatch: { $eq: user._id } } },
        //         { users: { $elemMatch: { $eq: userId } } },
        //     ],
        // }).populate("users", "-password").populate("latestMessage").populate("latestMessage.sender", "full_name email");

        // if (isChat.length > 0) {
        //     res.send(isChat[0]);
        // } else {
        //     const chatData = {
        //         chatName: user.full_name,
        //         // users: [user._id, userId]
        //         users: [userId],
        //     };
        //     const createdChat = await Chat.create(chatData);
        //     const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
        //     if (FullChat) {
        //         res.status(200).json(FullChat);
        //     } else {
        //         res.status(404).json({ message: "Chat not found" });
        //     }
        // }
        const isChat = await Chat.findOne({
            isGroupChat: false,
            users: { $all: [user._id, userId] }
        }).populate("users", "-password").populate("latestMessage").populate("latestMessage.sender", "full_name email");

        if (isChat) {
            res.status(200).json(isChat);
        } else {
            const chatData = {
                chatName: user.full_name,
                users: [user._id, userId]
            };
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");

            if (fullChat) {
                res.status(200).json(fullChat);
            } else {
                res.status(404).json({ message: "Chat not found" });
            }
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

//@description     Fetch all chats for a user
//@route           GET /api/v1/chat/
//@access          Protected
const fetchChats = asyncHandler(async (req: Request, res: Response) => {
    let { user }: any = req

    try {
        const results = await Chat.find({ users: { $elemMatch: { $eq: user._id } } })
            .populate("users", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 });

        const populatedResults = await User.populate(results, {
            path: "latestMessage.sender",
            select: "full_name email",
        });

        res.status(200).send(populatedResults);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});


const findAdminId = async () => {
    try {
        let adminId = await User.find({ email: 'admin@olivetech.net' }).exec();
        return adminId;
    } catch (error) {
        return null
    }

}
export {
    createChat,
    fetchChats
};
