import React from 'react';
import { Outlet } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

export const DefaultLayout: React.FC = () => {
  const { token, logout } = useAuth(); 
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-indigo-500 shadow-md py-4 px-6 flex justify-between items-center">
        <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-300">Midstack</h1>
        <nav className="space-x-4">
          <a href="/" className="text-gray-300 font-bold hover:text-gray-100">Home</a>
          {token ? (
            <button
              onClick={logout}
                className="text-gray-300 font-bold hover:text-gray-100"
            >Logout</button>
          ) : (
            <a href="/login" className="text-gray-300 font-bold hover:text-gray-100">Login</a>
          )}
        </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} MidStack. All rights reserved.
      </footer>
    </div>
  );
};