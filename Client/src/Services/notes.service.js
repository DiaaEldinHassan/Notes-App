import axios from "axios";
import { apiUrl } from "../../config.service.js";

export async function addNoteApi(note) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token");

  const res = await axios.post(
    `${apiUrl}/notes/newNote`,
    note,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data;
}

export async function getMyNotes(filter = {}) {
  const token = localStorage.getItem("token");

  if (typeof filter.checked === "boolean") {
    const res = await axios.get(
      `${apiUrl}/notes/checked`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.data;
  }
   if (typeof filter.deleted === "boolean") {
    const res = await axios.get(
      `${apiUrl}/notes/deleted`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.data;
  }

  const res = await axios.get(
    `${apiUrl}/notes/myNotes`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data.data;
}


 export async function updateNote(data) {
  try {
    const token=localStorage.getItem("token");
    if (!token) throw new Error("No token");
    const res=await axios.patch(`${apiUrl}/notes/updateNote`,data,{headers:{Authorization:`Bearer ${token}`}});
    return res;
  } catch (error) {
    console.log(error)
  }
 }