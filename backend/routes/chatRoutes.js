const express = require("express");

const router = express.Router();

const chatController = require("../controllers/chatController");

const authMiddleware = require("../middleware/authMiddleware");


// ============================
// SEND MESSAGE
// ============================
//send

router.post(
  "/send",
  authMiddleware,
  chatController.sendMessage
);


// ============================
// GET ROOM MESSAGES
// ============================

router.get(
  "/:roomId",
  authMiddleware,
  chatController.getMessages
);


// ============================
// GET MY CHAT LIST
// ============================

router.get(
  "/my/list",
  authMiddleware,
  chatController.getMyChats
);


module.exports = router;