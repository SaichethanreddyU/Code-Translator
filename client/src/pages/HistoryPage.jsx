import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import HistoryList from '../components/HistoryList.jsx';
import CodeEditor from '../components/CodeEditor.jsx';
import { getHistory, deleteHistoryItem, clearHistory } from '../services/historyService.js';
import '../styles/history.css';

function HistoryPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const ITEMS_PER_PAGE = 8;

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await getHistory(currentPage, ITEMS_PER_PAGE);
      setEntries(data.entries);
      setTotalPages(data.totalPages);
      setTotalEntries(data.totalEntries);
    } catch {
      toast.error('Failed to load history');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      await deleteHistoryItem(id);
      toast.success('Deleted');
      if (selectedEntry?._id === id) setSelectedEntry(null);
      fetchHistory();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Delete all history?')) return;
    try {
      const r = await clearHistory();
      toast.success(`Cleared ${r.deletedCount} entries`);
      setEntries([]);
      setTotalEntries(0);
      setTotalPages(0);
      setSelectedEntry(null);
      setCurrentPage(1);
    } catch {
      toast.error('Failed to clear');
    }
  };

  return (
    <div className="history-page">
      <div className="history-list">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <HistoryList
            entries={entries}
            onView={setSelectedEntry}
            onDelete={handleDelete}
          />
        )}
      </div>

      {selectedEntry && (
        <div className="detail-output-box">
          {selectedEntry.type === 'translate' && (
            <div>
              <span className="detail-lang-badge">Target: {selectedEntry.targetLanguage}</span>
              {selectedEntry.output?.translatedCode ? (
                <div className="detail-code-editor">
                  <CodeEditor
                    code={selectedEntry.output.translatedCode}
                    onChange={() => {}}
                    language={selectedEntry.targetLanguage}
                    readOnly
                  />
                </div>
              ) : (
                <p className="detail-text">No translated code available.</p>
              )}
            </div>
          )}
          {selectedEntry.type === 'analyze' && (
            <div>
              <div className="detail-complexity-row">
                <div className="detail-complexity-card">
                  <div className="detail-complexity-label">Time</div>
                  <div className="detail-complexity-value">{selectedEntry.output?.timeComplexity}</div>
                </div>
                <div className="detail-complexity-card">
                  <div className="detail-complexity-label">Space</div>
                  <div className="detail-complexity-value">{selectedEntry.output?.spaceComplexity}</div>
                </div>
              </div>
              {selectedEntry.output?.explanation && <p className="detail-text">{selectedEntry.output.explanation}</p>}
            </div>
          )}
          {selectedEntry.type === 'optimize' && (
            <div>
              {selectedEntry.output?.optimizedCode ? (
                <div className="detail-code-editor">
                  <CodeEditor
                    code={selectedEntry.output.optimizedCode}
                    onChange={() => {}}
                    language={selectedEntry.sourceLanguage}
                    readOnly
                  />
                </div>
              ) : (
                <p className="detail-text">No optimized code available.</p>
              )}
              {selectedEntry.output?.suggestions && <p className="detail-text">{selectedEntry.output.suggestions}</p>}
            </div>
          )}
          {selectedEntry.type === 'explain' && <p className="detail-text">{selectedEntry.output?.explanation}</p>}
        </div>
      )}

      {totalPages > 1 && (
        <div className="history-pagination">
          <button className="page-btn" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} className={`page-btn ${currentPage === p ? 'active' : ''}`} onClick={() => setCurrentPage(p)}>
              {p}
            </button>
          ))}
          <button className="page-btn" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}

      {totalEntries > 0 && (
        <button className="clear-history-btn" onClick={handleClearAll}>
          Clear All
        </button>
      )}
    </div>
  );
}

export default HistoryPage;