import React, { useState } from 'react';

export const AuthForm = ({ onAuthSuccess, isAdmin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/login' : '/api/signup';
      // const response = await fetch(`http://localhost:3000${endpoint}`, {
      const response = await fetch(`https://urvann-nursery.onrender.com${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        if (isLogin) {
          localStorage.setItem('token', data.token);
          if (data.isAdmin) {
            isAdmin()
          }
          onAuthSuccess();
        } else {
          setIsLogin(true);
          setUsername('');
          setPassword('');
          alert('Account created! Please login.');
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen fixed inset-0 bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-600 mb-2">
            Urvann Plant Store
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white placeholder-gray-500 outline-none"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white placeholder-gray-500 outline-none"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setUsername('');
              setPassword('');
            }}
            className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};
