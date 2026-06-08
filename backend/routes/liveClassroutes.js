const express = require("express");
const router = express.Router();
const lctrtl = require("../controller/liveClassController");
const { protect, allowRoles } = require("../middleware/authMiddleware");

router.post("/",protect,allowRoles("admin","instructor"),lctrtl.createLiveclass);
router.get("/",lctrtl.getliveclasses);
router.get("/:id",lctrtl.getsingleliveclasses);

module.exports = router;