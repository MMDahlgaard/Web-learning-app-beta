// src/hooks/useDeckDetail.ts
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { deckService } from '../services/deckService';
import { Deck } from '../models/Deck';
import { Flashcard } from '../models/Flashcard';
import { Chapter } from '../models/Chapter';

export function useDeckDetail(deckId: string) {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadDeckData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedDeck = await deckService.getDeck(deckId);
      if (!fetchedDeck) {
        throw new Error("Deck not found");
      }
      setDeck(fetchedDeck);
      const fetchedFlashcards = await deckService.getFlashcards(deckId);
      setFlashcards(fetchedFlashcards);
      const fetchedChapters = await deckService.getChapters(deckId);
      setChapters(fetchedChapters);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching deck details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDeckData();
  }, [deckId]);

  const handleAddFlashcard = async (question: string, answer: string, chapterId?: string) => {
    try {
      const newFlashcard = await deckService.addFlashcard(deckId, question, answer, chapterId);
      setFlashcards(prevFlashcards => [...prevFlashcards, newFlashcard]);
    } catch (err) {
      setError('Failed to add flashcard');
    }
  };

  return { deck, flashcards, chapters, error, isLoading, handleAddFlashcard };
}