// src/components/decks/ChapterDetail.tsx

// src/components/decks/ChapterDetail.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import VerticalNavbar from '../VerticalNavbar';
import './ChapterDetail.css';

export function ChapterDetail() {
  const { deckId, chapterId } = useParams<{ deckId: string, chapterId: string }>();

  // TODO: Implement hook to fetch chapter details

  return (
    <div className="chapter-detail-container">
      <VerticalNavbar />
      <div className="chapter-detail-content">
        <h1 className="chapter-title">Chapter Detail</h1>
        <p className="chapter-info">Deck ID: {deckId}</p>
        <p className="chapter-info">Chapter ID: {chapterId}</p>
        {/* TODO: Display chapter title and other details */}

        <h2 className="section-title">Flashcards in this Chapter</h2>
        {/* TODO: Implement fetching and displaying flashcards for this chapter */}
        <ul className="flashcard-list">
          {/* Example flashcard items */}
          <li className="flashcard-item">Flashcard 1</li>
          <li className="flashcard-item">Flashcard 2</li>
          <li className="flashcard-item">Flashcard 3</li>
        </ul>

        <button className="button">Add Flashcard to Chapter</button>
      </div>
    </div>
  );
}
export default ChapterDetail;
