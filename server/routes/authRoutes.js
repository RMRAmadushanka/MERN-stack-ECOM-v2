import express from "express";
const router = express.Router();

import { createOrUpdateUser } from "../controller/authController.js";
import { authCheck } from "../middleware/auth.js";

router.route("/create-or-update-user").post(authCheck, createOrUpdateUser);

export default router