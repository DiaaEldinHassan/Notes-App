import { useEffect, useState } from "react";
import { getMyNotes, updateNote } from "../../Services/notes.service.js"; // Import updateNote
import Nav from "../../Components/NavBar/NavBar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashArrowUp, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function Deleted() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetching data (Fixing the infinite loop)
  const fetchDeletedNotes = async () => {
    try {
      const data = await getMyNotes({ deleted: true });
      setNotes(data);
    } catch (error) {
      console.error("Error fetching deleted notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeletedNotes();
  }, []); // Empty dependency array is critical!

  // 2. Restore Functionality
  const restoreNote = async (note) => {
    try {
      await updateNote({ deleted: false, _id: note._id });
      fetchDeletedNotes(); 
    } catch (error) {
      console.error("Failed to restore note", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Trash Bin
          </h1>
          <p className="text-gray-500 mt-2 italic">Notes here are marked for deletion.</p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        ) : notes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div 
                key={note._id} 
                className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-red-200 transition-all flex flex-col h-full relative overflow-hidden"
              >
                {/* Red stripe on the side for 'Deleted' status */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-400"></div>

                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-lg font-bold text-gray-700 truncate pr-4">
                    {note.title || "Untitled Deleted Note"}
                  </h2>
                  <FontAwesomeIcon icon={faTrashCan} className="text-gray-300" />
                </div>

                <p className="text-gray-500 text-sm flex-1 line-clamp-3">
                  {note.content}
                </p>

                <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                   <button 
                    onClick={() => restoreNote(note)}
                    className="flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-widest transition-colors"
                  >
                    <FontAwesomeIcon icon={faTrashArrowUp} />
                    Restore
                  </button>
                  <span className="text-xs text-gray-400">
                    {note.endDate ? note.endDate.slice(0, 10) : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="text-6xl mb-4">🗑️</div>
            <h3 className="text-xl font-medium text-gray-900">Trash is empty</h3>
            <p className="text-gray-500">Clean as a whistle!</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}