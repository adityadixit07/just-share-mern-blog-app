import express from "express";
import { receiveMessageFromClient } from "../controllers/messageRequestController.js";

const router = express.Router();

router.route("/message").post(receiveMessageFromClient);

export const receiveMessageRouter = router;
