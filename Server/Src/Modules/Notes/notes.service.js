import { encryption, throwError, throwSuccess } from "../../Common/index.js";
import { addNewNote, getNotes, updateOne } from "../../DB/db.service.js";


export async function getNotesByFilter(token, filter = {}) {
  try {
    if (!token) throwError(401, "User is not authorized");

    const defaultFilter = { checked: false, deleted: false };
    const finalFilter = { user: token._id, ...defaultFilter, ...filter };

    const notes = await getNotes(finalFilter);

    return throwSuccess("Notes retrieved", notes);
  } catch (error) {
    throwError(error.status || 500, error.message);
  }
}

export async function addNote(data, token) {
  try {
    if (!token || !data.title || !data.content) {
      throwError(401, "Please check your token and your data");
    }

    data.user = token._id;
    data.content = await encryption(data.content);

    const newNote = await addNewNote(data);
    return throwSuccess("New note added successfully", newNote);
  } catch (error) {
    throwError(error.status || 500, error.message);
  }
}

export async function updateNote(data, token) {
  try {
    if (!token) throwError(401, "User is not authorized");
    if (!data._id) throwError(400, "Note ID required");

    if (
      !data.title &&
      !data.content &&
      !data.endDate &&
      typeof data.checked !== "boolean" &&
      typeof data.deleted !== "boolean"
    ) {
      throwError(400, "No data provided");
    }

    const updateData = {};
    if (data.title) updateData.title = data.title;
    if (data.content) updateData.content = await encryption(data.content);
    if (data.endDate) updateData.endDate = data.endDate;
    if (typeof data.checked === "boolean") updateData.checked = data.checked;
    if (typeof data.deleted === "boolean") updateData.deleted = data.deleted;

    const updatedNote = await updateOne(
      { user: token._id, _id: data._id },
      updateData
    );

    if (!updatedNote) throwError(404, "Note not found");

    return throwSuccess("Note updated successfully", updatedNote);
  } catch (error) {
    throwError(error.status || 500, error.message);
  }
}

export async function deleteNote(data, token) {
  try {
    if (!token) throwError(401, "User is not authorized");
    if (!data._id) throwError(400, "Note ID required");

    const deletedNote = await updateOne(
      { user: token._id, _id: data._id },
      { deleted: true }
    );

    if (!deletedNote) throwError(404, "Note not found");

    return throwSuccess("Note deleted successfully", deletedNote);
  } catch (error) {
    throwError(error.status || 500, error.message);
  }
}
