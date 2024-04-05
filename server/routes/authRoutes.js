import express from "express";
const router = express.Router();

import { createOrUpdateUser,currentUser } from "../controller/authController.js";
import { authCheck } from "../middleware/auth.js";

router.route("/create-or-update-user").post(authCheck, createOrUpdateUser);
router.route("/current-user").post(authCheck, currentUser);

export default router;
