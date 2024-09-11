// src/components/decks/CardView.tsx
import React from 'react';

interface CardViewProps {
  question: string;
  answer: string;
  isShowingAnswer: boolean;
}

const CardView: React.FC<CardViewProps> = ({ question, answer, isShowingAnswer }) => {
  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg p-6 max-w-md mx-auto h-64 flex flex-col justify-center transition-all duration-300 transform hover:scale-105">
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
        {isShowingAnswer ? 'Answer' : 'Question'}
      </h3>
      <div className="text-center text-lg">
        {isShowingAnswer ? answer : question}
      </div>
    </div>
  );
};

export default CardView;