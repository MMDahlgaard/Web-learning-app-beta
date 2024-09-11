// src/services/deckService.ts

import { db, auth } from '../firebase';
import { collection, doc, getDoc, setDoc, addDoc, query, where, getDocs, updateDoc, CollectionReference, Query, Timestamp } from 'firebase/firestore';


import { Deck } from '../models/Deck';
import { Chapter } from '../models/Chapter';
import { Flashcard } from '../models/Flashcard';
import { DeckDifficulty, DeckSettings, ReviewPerformance } from '../models/DeckSettings';

export const deckService = {
  async getDeck(deckId: string): Promise<Deck | null> {
    const docRef = doc(db, 'decks', deckId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        dueDate: data.dueDate.toDate(),
        createdDate: data.createdDate.toDate(),
        modifiedDate: data.modifiedDate.toDate()
      } as Deck;
    }
    return null;
  },

  async addChapter(deckId: string, title: string): Promise<Chapter> {
    const chapterRef = collection(db, 'decks', deckId, 'chapters');
    const newChapter: Omit<Chapter, 'id'> = {
      title,
      createdDate: new Date(),
      modifiedDate: new Date()
    };
    const docRef = await addDoc(chapterRef, newChapter);
    return { id: docRef.id, ...newChapter };
  },

  async addFlashcard(deckId: string, question: string, answer: string, chapterId?: string): Promise<Flashcard> {
    const flashcardRef = collection(db, 'decks', deckId, 'flashcards');
    const newFlashcard: Omit<Flashcard, 'id'> = {
      question,
      answer,
      createdDate: new Date(),
      nextReviewDate: new Date(),
      reviewCount: 0
    };
    const docRef = await addDoc(flashcardRef, newFlashcard);
    return { id: docRef.id, ...newFlashcard };
  },

  async getChapters(deckId: string): Promise<Chapter[]> {
    const chaptersRef = collection(db, 'decks', deckId, 'chapters');
    const snapshot = await getDocs(chaptersRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Chapter));
  },

  async getUserDecks(): Promise<Deck[]> {
    if (!auth.currentUser) throw new Error('User must be authenticated');

    const decksRef = collection(db, 'decks');
    const q = query(decksRef, where('userId', '==', auth.currentUser.uid));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        dueDate: data.dueDate.toDate(),
        createdDate: data.createdDate.toDate(),
        modifiedDate: data.modifiedDate.toDate()
      } as Deck;
    });
  },

  async createDeck(title: string, description: string, dueDate: Date, difficulty: DeckDifficulty): Promise<Deck> {
    if (!auth.currentUser) throw new Error('User must be authenticated');

    const newDeck: Omit<Deck, 'id'> = {
      title,
      description,
      dueDate,
      difficulty,
      settings: {
        easyInterval: 1,
        mediumInterval: 1,
        difficultInterval: 1,
        maximumInterval: 30,
        reviewsPerDay: 20,
        difficultyFactor: 1.0
      },
      createdDate: new Date(),
      modifiedDate: new Date(),
      userId: auth.currentUser.uid
    };

    const docRef = await addDoc(collection(db, 'decks'), newDeck);
    return { id: docRef.id, ...newDeck };
  },

  async getFlashcards(deckId: string): Promise<Flashcard[]> {
    const flashcardsRef = collection(db, 'decks', deckId, 'flashcards');
    const snapshot = await getDocs(flashcardsRef);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        lastReviewedDate: data.lastReviewedDate ? data.lastReviewedDate.toDate() : null,
        nextReviewDate: data.nextReviewDate.toDate(),
        createdDate: data.createdDate.toDate()
      } as Flashcard;
    });
  },

  async updateFlashcardReview(deckId: string, flashcardId: string, performance: ReviewPerformance): Promise<Flashcard> {
    const flashcardRef = doc(db, 'decks', deckId, 'flashcards', flashcardId);
    const flashcardDoc = await getDoc(flashcardRef);

    if (!flashcardDoc.exists()) {
      throw new Error('Flashcard not found');
    }

    const flashcard = flashcardDoc.data() as Flashcard;
    const now = new Date();

    const updatedFlashcard: Flashcard = {
      ...flashcard,
      lastReviewedDate: now,
      difficulty: performance,
      reviewCount: (flashcard.reviewCount || 0) + 1,
      // We're not calculating nextReviewDate or updating easeFactor
    };

    await updateDoc(flashcardRef, {
      lastReviewedDate: Timestamp.fromDate(now),
      difficulty: performance,
      reviewCount: updatedFlashcard.reviewCount,
    });

    return updatedFlashcard;
  }

 

  
};