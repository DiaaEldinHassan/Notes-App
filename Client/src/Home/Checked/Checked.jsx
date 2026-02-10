import { useEffect, useState } from "react";
import { getMyNotes } from "../../Services/notes.service.js";
import Footer from "../../Components/Footer/Footer";
import Nav from "../../Components/NavBar/NavBar";

export default function Checked() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getNotes() {
      try {
        // Assuming your service filters for checked: true
        const data = await getMyNotes({ checked: true });
        setNotes(data);
      } catch (error) {
        console.error("Error fetching checked notes:", error);
      } finally {
        setLoading(false);
      }
    }
    getNotes();
  }, []); // Added dependency array to stop the infinite loop!

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Checked Notes
          </h1>
          <p className="text-gray-500 mt-2">Your completed tasks and archives.</p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        ) : notes.length > 0 ? (
          /* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div 
                key={note._id} 
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 line-through decoration-gray-400">
                    {note.title}
                  </h2>
                </div>

                <p className="text-gray-600 text-sm flex-1">
                  {note.content}
                </p>

                <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Completed
                  </span>
                  <span className="text-xs text-gray-400">
                    {note.endDate ? new Date(note.endDate).toLocaleDateString() : "No date"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-medium text-gray-900">No checked notes yet</h3>
            <p className="text-gray-500">Finish some tasks to see them here!</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}