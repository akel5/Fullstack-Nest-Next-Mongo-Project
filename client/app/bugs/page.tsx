'use client';

import { useState, useEffect } from 'react';

type Bug = {
  _id: string;
  title: string;
  description: string;
  severity: string;
  status: string;
  assignedTo?: string;
  reportedBy: string;
};

export default function Home() {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [newBug, setNewBug] = useState({
    title: '',
    description: '',
    severity: 'Medium',
    reportedBy: '',
  });

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      const res = await fetch('http://localhost:3001/bugs');
      const data = await res.json();
      if (Array.isArray(data)) {
        setBugs(data);
      } else {
        console.error('Data received is not an array:', data);
        setBugs([]);
      }
    } catch (error) {
      console.error('Error fetching bugs:', error);
    }
  };

  const handleCreateBug = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBug.title.trim() || !newBug.reportedBy.trim()) return;

    try {
      const res = await fetch('http://localhost:3001/bugs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBug),
      });
      if (res.ok) {
        setNewBug({ title: '', description: '', severity: 'Medium', reportedBy: '' });
        fetchBugs();
      }
    } catch (error) {
      console.error('Error creating bug:', error);
    }
  };

  const updateBugStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`http://localhost:3001/bugs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchBugs();
    } catch (error) {
      console.error('Error updating bug status:', error);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'red';
      case 'High': return 'orange';
      case 'Medium': return 'yellow';
      case 'Low': return 'green';
      default: return 'gray';
    }
  };

  return (
    <main style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Bug Tracker 🐞</h1>
      
      {/* טופס יצירת באג חדש */}
      <div style={{ marginBottom: '40px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h2>Report a New Bug</h2>
        <form onSubmit={handleCreateBug} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            placeholder="Bug Title"
            value={newBug.title}
            onChange={(e) => setNewBug({ ...newBug, title: e.target.value })}
            style={{ padding: '8px' }}
          />
          <textarea
            placeholder="Bug Description"
            value={newBug.description}
            onChange={(e) => setNewBug({ ...newBug, description: e.target.value })}
            style={{ padding: '8px' }}
          />
          <select
            value={newBug.severity}
            onChange={(e) => setNewBug({ ...newBug, severity: e.target.value })}
            style={{ padding: '8px' }}
          >
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            type="text"
            placeholder="Reported By"
            value={newBug.reportedBy}
            onChange={(e) => setNewBug({ ...newBug, reportedBy: e.target.value })}
            style={{ padding: '8px' }}
          />
          <button type="submit" style={{ padding: '10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px' }}>
            Report Bug
          </button>
        </form>
      </div>

      {/* טבלת באגים קיימים */}
      <h2>Open Bugs</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '12px' }}>Title</th>
            <th style={{ padding: '12px' }}>Severity</th>
            <th style={{ padding: '12px' }}>Status</th>
            <th style={{ padding: '12px' }}>Reported By</th>
            <th style={{ padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bugs.map((bug) => (
            <tr key={bug._id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px' }}>{bug.title}</td>
              <td style={{ padding: '12px', color: getSeverityColor(bug.severity) }}>{bug.severity}</td>
              <td style={{ padding: '12px' }}>{bug.status}</td>
              <td style={{ padding: '12px' }}>{bug.reportedBy}</td>
              <td style={{ padding: '12px' }}>
                <select
                  value={bug.status}
                  onChange={(e) => updateBugStatus(bug._id, e.target.value)}
                  style={{ padding: '6px' }}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Ready for QA">Ready for QA</option>
                  <option value="Closed">Closed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}