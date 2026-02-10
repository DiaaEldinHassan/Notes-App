import { addNoteApi, getMyNotes } from "../../Services/notes.service.js";
import Overlay from "../../Components/OverlayModal/Overlay.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { updateNote } from "../../Services/notes.service.js";

export default function SideBar({ notes = [], setNotes, getNote }) {
  const [showModal, setShowModal] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "", date: "" });

  async function handleAddNote() {
    try {
      await addNoteApi(newNote);
      const updatedNotes = await getMyNotes();
      setNotes(updatedNotes);
      setNewNote({ title: "", content: "", date: "" });
      setShowModal(false);
    } catch (err) { console.error(err.message); }
  }

  const handleAction = async (note, type) => {
    try {
      const updateData = type === 'check' ? { checked: !note.checked } : { deleted: !note.deleted };
      await updateNote({ ...updateData, _id: note._id });
      const updatedNotes = await getMyNotes();
      setNotes(updatedNotes);
    } catch (error) { console.log(error.message); }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <Overlay
        showModal={showModal}
        setShowModal={setShowModal}
        newNote={newNote}
        setNewNote={setNewNote}
        onSave={handleAddNote}
      />

      {/* Header Area */}
      <div className="p-4 border-b border-gray-100">
        <button 
          onClick={() => setShowModal(true)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-emerald-100"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>New Note</span>
        </button>
      </div>

      <div className="p-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Your Notes</h2>
        
        {/* Notes List: Vertical on desktop, scrollable area on mobile */}
        <div className="space-y-3 overflow-y-auto max-h-400px lg:max-h-none pr-1 custom-scrollbar">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note._id}
                onClick={() => getNote(note)}
                className={`group p-4 rounded-xl border transition-all cursor-pointer ${
                  note.checked 
                  ? 'bg-gray-50 border-gray-100 opacity-60' 
                  : 'bg-white border-gray-200 hover:border-emerald-300 hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-bold text-sm truncate pr-2 ${note.checked ? 'line-through' : 'text-gray-800'}`}>
                    {note.title || "Untitled"}
                  </h3>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleAction(note, 'check'); }}
                      className="text-gray-400 hover:text-emerald-500 transition-colors"
                    >
                      <FontAwesomeIcon icon={faCheck} size="xs" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleAction(note, 'delete'); }}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTrash} size="xs" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                  {note.content || "No content..."}
                </p>

                <div className="flex items-center justify-between mt-auto">
                   <span className="text-[10px] font-bold text-gray-400 uppercase">
                    {note.endDate ? note.endDate.slice(0, 10) : "No Date"}
                  </span>
                  {note.checked && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase">
                      Done
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-400 text-sm italic">
              No notes yet...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}