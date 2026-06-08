const express = require("express");
const router = express.Router();
const mctrl = require("../controller/messageController");

router.get("/:senderId/:reciverId",mctrl.getmessages);

module.exports = router;