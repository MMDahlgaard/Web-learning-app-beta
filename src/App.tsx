// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Dashboard from './Components/Dashboard';
import { DeckDetail } from './Components/decks/DeckDetail';
import { ChapterDetail } from './Components/decks/ChapterDetail';
import { FlashcardReview } from './Components/decks/FlashcardReview';
import Login from './Components/Login';
import Signup from './Components/Signup';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return currentUser ? <>{children}</> : <Navigate to="/login" />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return currentUser ? <Navigate to="/dashboard" /> : <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/deck/:deckId" element={<PrivateRoute><DeckDetail /></PrivateRoute>} />
          <Route path="/deck/:deckId/chapter/:chapterId" element={<PrivateRoute><ChapterDetail /></PrivateRoute>} />
          <Route path="/deck/:deckId/review/:reviewMode" element={<PrivateRoute><FlashcardReview /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;