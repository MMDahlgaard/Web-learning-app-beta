// src/hooks/useFlashcardReview.ts

import { useState, useEffect, useCallback } from 'react';
import { deckService } from '../services/deckService';
import { Flashcard } from '../models/Flashcard';
import { ReviewPerformance } from '../models/DeckSettings';

export enum ReviewMode {
  AllCards = 'allCards',
  NotReviewedRecently = 'notReviewedRecently',
  DifficultCards = 'difficultCards',
  MediumCards = 'mediumCards',
  EasyCards = 'easyCards'
}

export function useFlashcardReview(deckId: string, reviewMode: ReviewMode) {
  const [currentFlashcard, setCurrentFlashcard] = useState<Flashcard | null>(null);
  const [remainingFlashcards, setRemainingFlashcards] = useState<Flashcard[]>([]);
  const [isShowingAnswer, setIsShowingAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFlashcards = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const flashcards = await deckService.getFlashcards(deckId);
      let filteredFlashcards: Flashcard[] = [];

      switch (reviewMode) {
        case ReviewMode.AllCards:
          filteredFlashcards = flashcards;
          break;
        case ReviewMode.NotReviewedRecently:
          const threeMonthsAgo = new Date();
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
          filteredFlashcards = flashcards.filter(card => !card.lastReviewedDate || card.lastReviewedDate < threeMonthsAgo);
          break;
        case ReviewMode.DifficultCards:
          filteredFlashcards = flashcards.filter(card => card.difficulty === 'difficult');
          break;
        case ReviewMode.MediumCards:
          filteredFlashcards = flashcards.filter(card => card.difficulty === 'medium');
          break;
        case ReviewMode.EasyCards:
          filteredFlashcards = flashcards.filter(card => card.difficulty === 'easy');
          break;
      }

      setRemainingFlashcards(filteredFlashcards.sort(() => Math.random() - 0.5));
      nextFlashcard(filteredFlashcards);
    } catch (error) {
      console.error("Error loading flashcards:", error);
      setError("Failed to load flashcards. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [deckId, reviewMode]);

  useEffect(() => {
    loadFlashcards();
  }, [loadFlashcards]);

  const nextFlashcard = (flashcards: Flashcard[] = remainingFlashcards) => {
    if (flashcards.length > 0) {
      setCurrentFlashcard(flashcards[0]);
      setRemainingFlashcards(flashcards.slice(1));
      setIsShowingAnswer(false);
    } else {
      setCurrentFlashcard(null);
    }
  };

  const handleResponse = async (performance: ReviewPerformance) => {
    if (currentFlashcard) {
      try {
        await deckService.updateFlashcardReview(deckId, currentFlashcard.id, performance);
        nextFlashcard();
      } catch (error) {
        console.error("Error updating flashcard review:", error);
        setError("Failed to update flashcard. Please try again.");
      }
    }
  };

  const toggleAnswer = () => {
    setIsShowingAnswer(!isShowingAnswer);
  };

  const restartReview = () => {
    loadFlashcards();
  };

  return {
    currentFlashcard,
    remainingFlashcards,
    isShowingAnswer,
    isLoading,
    error,
    handleResponse,
    toggleAnswer,
    restartReview,
    reviewMode
  };
}