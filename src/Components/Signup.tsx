import React, { useState } from 'react';
import { createUserWithEmailAndPassword, AuthError } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header'; 

// Updated User interface
interface User {
  id: string;  // Added user ID field
  email: string;
  firstName: string;
  lastName: string;
  signUpDate: Date;
}

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      // Step 1: Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Create a user document in Firestore
      const userData: User = {
        id: user.uid,  // Include the user ID in the document
        email: user.email!,
        firstName,
        lastName,
        signUpDate: new Date(),
      };

      // Step 3: Set the user document in Firestore
      await setDoc(doc(db, 'users', user.uid), userData);

      // Step 4: Navigate to the dashboard
      navigate('/dashboard');
    } catch (error) {
      const firebaseError = error as AuthError;
      if (firebaseError.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please try another one.');
      } else if (firebaseError.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters long.');
      } else {
        setError('Failed to create an account. Please try again.');
      }
      console.error(firebaseError);
    }
  };

  return (
    <>
      <Header />  

      {/* Login form below the header */}
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Sign Up</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="firstName" className="block mb-1">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-1">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Sign Up
        </button>
      </form>
    </div>
    </>
  );
};

export default Signup;
