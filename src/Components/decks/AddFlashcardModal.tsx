// src/components/decks/AddFlashcardModal.tsx

import React, { useState } from 'react';
import { Chapter } from '../../models/Deck';  // Ensure this import path is correct

interface AddFlashcardModalProps {
  onClose: () => void;
  onAddFlashcard: (question: string, answer: string, chapterId?: string) => void;
  chapters: Chapter[];
}

const AddFlashcardModal: React.FC<AddFlashcardModalProps> = ({ onClose, onAddFlashcard, chapters }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState<string | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && answer.trim()) {
      onAddFlashcard(question.trim(), answer.trim(), selectedChapterId);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Add New Flashcard</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="question" className="block text-sm font-medium text-gray-700">Question</label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700">Answer</label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows={3}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="chapter" className="block text-sm font-medium text-gray-700">Chapter (Optional)</label>
            <select
              id="chapter"
              value={selectedChapterId}
              onChange={(e) => setSelectedChapterId(e.target.value || undefined)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select a chapter</option>
              {chapters.map((chapter) => (
                <option key={chapter.id} value={chapter.id}>{chapter.title}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Flashcard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFlashcardModal;