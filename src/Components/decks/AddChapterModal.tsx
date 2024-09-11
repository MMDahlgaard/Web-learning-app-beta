// src/components/decks/AddChapterModal.tsx

import React, { useState } from 'react';

interface AddChapterModalProps {
  onClose: () => void;
  onAddChapter: (title: string) => void;
}

const AddChapterModal: React.FC<AddChapterModalProps> = ({ onClose, onAddChapter }) => {
  const [chapterTitle, setChapterTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chapterTitle.trim()) {
      onAddChapter(chapterTitle.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4">New Chapter</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="chapterTitle" className="block text-sm font-medium text-gray-700">Chapter Title</label>
            <input
              type="text"
              id="chapterTitle"
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter chapter title"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!chapterTitle.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Add Chapter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChapterModal;