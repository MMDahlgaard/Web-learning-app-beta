// src/components/decks/FlashcardReview.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFlashcardReview, ReviewMode } from '../../hooks/useFlashcardReview';
import { ReviewPerformance } from '../../models/DeckSettings';
import VerticalNavbar from '../VerticalNavbar';
import CardView from './CardView';

export function FlashcardReview() {
  const { deckId, reviewMode } = useParams<{ deckId: string, reviewMode: string }>();
  const navigate = useNavigate();
  const {
    currentFlashcard,
    remainingFlashcards,
    isShowingAnswer,
    isLoading,
    handleResponse,
    toggleAnswer,
    restartReview
  } = useFlashcardReview(deckId || '', reviewMode as ReviewMode);

  if (isLoading) {
    return (
      <div className="flex">
        <VerticalNavbar />
        <div className="flex-1 p-8 ml-64 bg-gray-50">
          <div className="bg-white shadow rounded-lg p-6">
            Loading flashcards...
          </div>
        </div>
      </div>
    );
  }

  const handleCompletion = () => {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Review Complete</h2>
        <p className="mb-4">You've reviewed all the flashcards in this set.</p>
        <button 
          onClick={restartReview}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mr-4"
        >
          Review Again
        </button>
        <button 
          onClick={() => navigate(`/deck/${deckId}`)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
        >
          Finish
        </button>
      </div>
    );
  };

  return (
    <div className="flex">
      <VerticalNavbar />
      <div className="flex-1 p-8 ml-64 bg-gray-50">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Flashcard Review</h1>
          {currentFlashcard ? (
            <div className="space-y-6">
              <CardView
                question={currentFlashcard.question}
                answer={currentFlashcard.answer}
                isShowingAnswer={isShowingAnswer}
              />
              <div className="text-center">
                <button 
                  onClick={toggleAnswer}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  {isShowingAnswer ? 'Hide Answer' : 'Show Answer'}
                </button>
              </div>
              {isShowingAnswer && (
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={() => handleResponse(ReviewPerformance.Difficult)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                  >
                    Difficult
                  </button>
                  <button 
                    onClick={() => handleResponse(ReviewPerformance.Medium)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
                  >
                    Medium
                  </button>
                  <button 
                    onClick={() => handleResponse(ReviewPerformance.Easy)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                  >
                    Easy
                  </button>
                </div>
              )}
              <p className="text-center text-gray-600">Flashcards remaining: {remainingFlashcards.length + 1}</p>
            </div>
          ) : (
            handleCompletion()
          )}
        </div>
      </div>
    </div>
  );
}