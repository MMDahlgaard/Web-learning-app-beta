import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deckService } from '../services/deckService';
import VerticalNavbar from './VerticalNavbar';
import DeckCreation from './decks/DeckCreation';
import { Deck } from '../models/Deck';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDecks = async () => {
    try {
      setIsLoading(true);
      const fetchedDecks = await deckService.getUserDecks();
      setDecks(fetchedDecks);
      setError(null);
    } catch (err) {
      setError('Failed to fetch decks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  const handleCreateDeck = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleDeckCreated = () => {
    fetchDecks();
  };

  return (
    <div className="dashboard-container">
      <VerticalNavbar />
      <div className="dashboard-content p-10">
        <h1 className="text-3xl font-bold mb-6">Your Decks</h1>
        <button
          onClick={handleCreateDeck}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
        >
          + Create Deck
        </button>
        {showForm && (
          <DeckCreation 
            onClose={handleCloseForm} 
            onDeckCreated={handleDeckCreated}
          />
        )}
        {isLoading ? (
          <p>Loading decks...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {decks.map((deck) => (
              <Link 
                to={`/deck/${deck.id}`}
                key={deck.id}
                className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-2">{deck.title}</h2>
                <p className="text-sm text-gray-500">
                  Due Date: {deck.dueDate.toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;