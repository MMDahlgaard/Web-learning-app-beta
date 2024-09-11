// src/components/decks/DeckCreation.tsx

import React, { useState } from 'react';
import { DeckDifficulty } from '../../models/DeckSettings';
import { useDeckCreation } from '../../hooks/useDeckCreation';

interface DeckCreationProps {
  onClose: () => void;
  onDeckCreated: () => void;
}

const DeckCreation: React.FC<DeckCreationProps> = ({ onClose, onDeckCreated }) => {
  const { createDeck, isLoading, error } = useDeckCreation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [difficulty, setDifficulty] = useState<DeckDifficulty>(DeckDifficulty.Medium);

  const handleSubmit = async () => {
    if (title) {
      const newDeck = await createDeck(title, description, dueDate, difficulty);
      if (newDeck) {
        onDeckCreated();
        onClose();
      }
    }
  };

  return (
    <div>
      <h2>Create a New Deck</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        disabled={isLoading}
      />
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        disabled={isLoading}
      />
      <input
        type="date"
        value={dueDate.toISOString().substring(0, 10)}
        onChange={e => setDueDate(new Date(e.target.value))}
        disabled={isLoading}
      />
      <select 
        value={difficulty} 
        onChange={e => setDifficulty(e.target.value as DeckDifficulty)}
        disabled={isLoading}
      >
        <option value={DeckDifficulty.Easy}>Easy</option>
        <option value={DeckDifficulty.Medium}>Medium</option>
        <option value={DeckDifficulty.Hard}>Hard</option>
      </select>
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Deck'}
      </button>
      <button onClick={onClose} disabled={isLoading}>Cancel</button>
    </div>
  );
};

export default DeckCreation;