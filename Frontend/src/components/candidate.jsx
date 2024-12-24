import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CandidateTable = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    // Fetch candidates from backend
    axios.get('http://localhost:3000/api/candidates') 
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((error) => {
        console.error('Error fetching candidates:', error);
      });
  }, []);

  // Filter candidates based on name or skill
  const filteredCandidates = candidates.filter((candidate) => {
    const search = searchTerm.toLowerCase();
    return (
      candidate.Name.toLowerCase().includes(search) || 
      candidate.Skills.some(skill => skill.toLowerCase().includes(search))
    );
  });

  // Sort candidates by years of experience
  const sortCandidates = (candidates) => {
    let sortedCandidates = [...candidates]; // Sort after filtering

    // Sorting by Years of Experience
    if (sortOrder === 'asc') {
      sortedCandidates = sortedCandidates.sort((a, b) => a['Years of Experience'] - b['Years of Experience']);
    } else if (sortOrder === 'desc') {
      sortedCandidates = sortedCandidates.sort((a, b) => b['Years of Experience'] - a['Years of Experience']);
    }

    return sortedCandidates;
  };

  // Toggle sorting for years of experience
  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedCandidates = sortCandidates(filteredCandidates); // Apply sorting after filtering

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 py-10">
      <div className="max-w-7xl mx-auto bg-gray-800 p-8 rounded-xl shadow-xl">
        <h1 className="text-center text-4xl font-bold text-white mb-6">Candidates List</h1>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search by name or skill"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 w-full max-w-xs border border-teal-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          />
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={toggleSortOrder}
            className="bg-teal-600 text-white text-lg py-3 px-8 rounded-lg shadow-md hover:bg-teal-500 transition"
          >
            Sort by Experience ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </button>
        </div>

        <table className="min-w-full table-auto bg-gray-800 border-collapse rounded-lg shadow-md overflow-hidden">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-4 text-center font-semibold">Name</th>
              <th className="px-6 py-4 text-left font-semibold">Skills</th>
              <th className="px-6 py-4 text-center font-semibold">Experience</th>
            </tr>
          </thead>
          <tbody className="text-gray-200">
            {sortedCandidates.length > 0 ? (
              sortedCandidates.map((candidate, index) => (
                <tr
                  key={index}
                  className={`hover:bg-teal-700 ${index % 2 === 0 ? 'bg-gray-900' : ''}`}
                >
                  <td className="px-6 py-4 text-center">{candidate.Name}</td>
                  <td className="px-6 py-4">{candidate.Skills.join(', ')}</td>
                  <td className="px-6 py-4 text-center">{candidate['Years of Experience']}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">No candidates found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateTable;
