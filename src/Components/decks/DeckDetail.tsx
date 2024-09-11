// src/components/decks/DeckDetail.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDeckDetail } from '../../hooks/useDeckDetail';
import VerticalNavbar from '../VerticalNavbar';
import AddChapterModal from './AddChapterModal';
import AddFlashcardModal from './AddFlashcardModal';
import { ReviewMode } from '../../hooks/useFlashcardReview';
import { Deck, Chapter, Flashcard } from '../../models/Deck';  // Ensure these types are correctly imported

export function DeckDetail() {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const {
    deck,
    chapters,
    flashcards,
    loading,
    error,
    handleAddChapter,
    handleAddFlashcard,
  } = useDeckDetail(deckId || '');

  const [showAddChapter, setShowAddChapter] = useState(false);
  const [showAddFlashcard, setShowAddFlashcard] = useState(false);

  if (loading) {
    return (
      <div className="flex h-screen">
        <VerticalNavbar />
        <div className="flex-1 p-8 ml-64">
          <div className="text-center">Loading deck details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen">
        <VerticalNavbar />
        <div className="flex-1 p-8 ml-64">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!deck) {
    return (
      <div className="flex h-screen">
        <VerticalNavbar />
        <div className="flex-1 p-8 ml-64">
          <div className="text-center">Deck not found</div>
        </div>
      </div>
    );
  }

  const startReview = (mode: ReviewMode) => {
    navigate(`/deck/${deckId}/review/${mode}`);
  };

  return (
    <div className="flex h-screen">
      <VerticalNavbar />
      <div className="flex-1 p-8 ml-64 overflow-auto">
        <h1 className="text-3xl font-bold mb-4">{deck.title}</h1>
        <p className="mb-2">Description: {deck.description || 'No description'}</p>
        <p className="mb-2">Due Date: {deck.dueDate.toLocaleDateString()}</p>
        <p className="mb-4">Difficulty: {deck.difficulty}</p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Chapters</h2>
        <button
          onClick={() => setShowAddChapter(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        >
          Add Chapter
        </button>
        <ul className="list-disc pl-5 mb-6">
          {chapters.map((chapter: Chapter) => (
            <li key={chapter.id}>
              <Link
                to={`/deck/${deckId}/chapter/${chapter.id}`}
                className="text-blue-500 hover:underline"
              >
                {chapter.title}
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Flashcards</h2>
        <p className="mb-2">Total Flashcards: {flashcards.length}</p>
        <button
          onClick={() => setShowAddFlashcard(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
        >
          Add Flashcard
        </button>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Review Options</h2>
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => startReview(ReviewMode.DueCards)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Review Due Cards
          </button>
          <button
            onClick={() => startReview(ReviewMode.AllCards)}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Review All Cards
          </button>
        </div>

        {showAddChapter && (
          <AddChapterModal
            onClose={() => setShowAddChapter(false)}
            onAddChapter={handleAddChapter}
          />
        )}

        {showAddFlashcard && (
          <AddFlashcardModal
            onClose={() => setShowAddFlashcard(false)}
            onAddFlashcard={(question, answer, chapterId) => 
              handleAddFlashcard(question, answer, chapterId || undefined)
            }
            chapters={chapters}
          />
        )}
      </div>
    </div>
  );
}

export default DeckDetail;