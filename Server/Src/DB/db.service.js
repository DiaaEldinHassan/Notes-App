import { decryption } from "../Common/index.js";
import { notesModel, usersModel } from "./index.js";

export async function findOne(filter = {}, options = {}) {
  return await usersModel.findOne(filter);
}

export async function findById(id,select="") {
  return await usersModel.findById(id).select(select);
}

export async function findByIdAndUpdate(data,id) {
  return await usersModel.findByIdAndUpdate(id,data);
}

export async function insertOne(data) {
  return await usersModel.create(data);
}

export async function getNotes(filter = {}, options = {}) {
  const notes = await notesModel.find(filter).lean();
  notes.forEach(async (note) => {
    note.content = await decryption(note.content);
  });
  return notes;
}

export async function addNewNote(data = {}) {
  return await notesModel.create({
    title: data.title,
    content: data.content,
    endDate: data.date || new Date(),
    user: data.user,
  });
}

export async function updateOne(filter = {}, update = {}) {
  delete update._id;
  delete update.user;
  return await notesModel.findOneAndUpdate(
    filter,
    { $set: update },
    { new: true, runValidators: true },
  );
}
