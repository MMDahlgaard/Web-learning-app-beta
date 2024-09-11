import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../firebase';

interface FlashcardFormProps {
  onClose: () => void;
}

const FlashcardForm: React.FC<FlashcardFormProps> = ({ onClose }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (auth.currentUser) {
      try {
        await addDoc(collection(db, 'flashcards'), {
          userId: auth.currentUser.uid,
          front,
          back,
          subject,
          chapter,
          lastReviewed: new Date(),
          nextReview: new Date(),
        });
        onClose();
      } catch (error) {
        console.error('Error adding flashcard: ', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="front" className="block mb-1">Front</label>
        <input
          type="text"
          id="front"
          value={front}
          onChange={(e) => setFront(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="back" className="block mb-1">Back</label>
        <textarea
          id="back"
          value={back}
          onChange={(e) => setBack(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block mb-1">Subject</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="chapter" className="block mb-1">Chapter</label>
        <input
          type="text"
          id="chapter"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Create Flashcard
        </button>
      </div>
    </form>
  );
};

export default FlashcardForm;