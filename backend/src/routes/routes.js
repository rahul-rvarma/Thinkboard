import express from "express";
import { create_note, get_all_notes, delete_note,get_specific_note, update_note } from "../controllers/controller.js";

const router = express.Router();

router.post("/", create_note);
router.get("/", get_all_notes);
router.get("/:id", get_specific_note);
router.patch("/:id", update_note);
router.delete("/:id", delete_note);

export default router;