import React from 'react';
import { Navbar } from './Navbar';
import { useAuth } from '../context/AuthContext';

export function Layout({ children }) {
  const {authToken} = useAuth();
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
}