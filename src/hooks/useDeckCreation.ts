// src/hooks/useDeckCreation.ts

import { useState } from 'react';
import { deckService } from '../services/deckService';
import { Deck } from '../models/Deck';
import { DeckDifficulty } from '../models/DeckSettings'

export function useDeckCreation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createDeck = async (title: string, description: string, dueDate: Date, difficulty: DeckDifficulty): Promise<Deck | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const newDeck = await deckService.createDeck(title, description, dueDate, difficulty);
      setIsLoading(false);
      return newDeck;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while creating the deck');
      setIsLoading(false);
      return null;
    }
  };

  return { createDeck, isLoading, error };
}