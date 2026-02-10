import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer/Footer.jsx";
import Nav from "../Components/NavBar/NavBar.jsx";
import axios from "axios";
import SideBar from "../Components/SideBar/SideBar.jsx";
import { getMyNotes, updateNote } from "../Services/notes.service.js";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({});
  const [update, setUpdate] = useState({ title: "", content: "", endDate: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/auth/signIn"); return; }

    async function getNotes() {
      try {
        const res = await axios.get("http://localhost:3000/notes/myNotes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(res.data.data);
      } catch (error) { console.log(error.message); }
    }
    getNotes();
  }, [navigate]);

  function getNote(selectedNote) {
    setNote(selectedNote);
    // Format the date to YYYY-MM-DD for the input field
    const formattedDate = selectedNote.endDate ? selectedNote.endDate.split('T')[0] : "";
    setUpdate({ ...selectedNote, endDate: formattedDate });
  }

  async function handleUpdate() {
    try {
      await updateNote(update);
      const updatedNotes = await getMyNotes();
      setNotes(updatedNotes);
      alert("Note updated successfully!");
    } catch (error) { console.log(error.response?.data); }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav />

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* Sidebar: Scrollable on Desktop, Stacks on Mobile */}
        <div className="w-full lg:w-80 bg-white border-r border-gray-200 lg:h-[calc(100vh-64px)] overflow-y-auto">
          <SideBar
            notes={notes}
            setNotes={setNotes}
            getNote={getNote}
          />
        </div>

        {/* Note Editor Area */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
          {note._id ? (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10 space-y-6">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Note Title</label>
                <input
                  className="w-full text-3xl font-bold text-gray-800 border-none focus:ring-0 placeholder-gray-300 p-0"
                  type="text"
                  placeholder="Untitled Note"
                  onChange={(e) => setUpdate({ ...update, title: e.target.value })}
                  value={update.title}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Content</label>
                <textarea
                  className="w-full text-lg text-gray-600 border-none focus:ring-0 placeholder-gray-300 min-h-300px p-0 resize-none"
                  placeholder="Start writing..."
                  onChange={(e) => setUpdate({ ...update, content: e.target.value })}
                  value={update.content}
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-100 gap-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="text-sm font-medium">Due Date:</span>
                  <input
                    className="text-sm border-none bg-gray-100 rounded-lg px-3 py-1 focus:ring-2 focus:ring-emerald-400 outline-none"
                    type="date"
                    onChange={(e) => setUpdate({ ...update, endDate: e.target.value })}
                    value={update.endDate}
                  />
                </div>

                <button 
                  className="w-full sm:w-auto px-10 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-200 transition-all active:scale-95" 
                  onClick={handleUpdate}
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              </div>
              <p className="text-xl font-medium">Select a note to view or edit</p>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}