import { Router } from "express";
import { addNote,  updateNote, getNotesByFilter } from "./notes.service.js";
import { authorization, role, success } from "../../Common/index.js";

export const router = Router();

router.get("/myNotes",authorization([role.user,role.admin]), async (req, res, next) => {
  try {
    const notes = await getNotesByFilter(req.user);
    success(res, 200, notes);
  } catch (error) {
    success(res, 200, notes);
  }
});
router.post("/newNote", async (req, res, next) => {
  try {
    const newNote = await addNote(req.body, req.user);
    success(res, 200, newNote);
  } catch (error) {
    next(error);
  }
});

router.get("/checked",authorization([role.user,role.admin]),async (req,res,next) => {
  try {
    const notes=await getNotesByFilter(req.user,{checked:true});
    success(res, 200, notes);
  } catch (error) {
    next(error);
  }
})
router.get("/deleted",authorization([role.user,role.admin]),async (req,res,next) => {
  try {
    const notes=await getNotesByFilter(req.user,{deleted:true});
    success(res, 200, notes);
  } catch (error) {
    next(error);
  }
})

router.patch("/updateNote",authorization([role.user,role.admin]), async (req, res, next) => {
  try {
    const update = await updateNote(req.body, req.user);
    success(res, 200, update);
  } catch (error) {
    next(error);
  }
});
