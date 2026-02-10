import "./Overlay.css";

export default function Overlay({
  showModal,
  setShowModal,
  newNote,
  setNewNote,
  onSave,
}) {
  if (!showModal) return null;

  return (
    <div className="overlay" onClick={() => setShowModal(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Add Note</h2>

        <input
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />

        <textarea
          placeholder="Content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />

        <input
          type="date"
          value={newNote.date}
          onChange={(e) => setNewNote({ ...newNote, date: e.target.value })}
        />
        <div className="btns">
          <button className="bg-emerald-500 border border-transparent text-white" onClick={onSave}>Save</button>
          <button className="border border-gray-500" onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
