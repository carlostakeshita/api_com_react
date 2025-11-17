import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import MovieForm from '../components/MovieForm';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/movies';

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {

        setMovies(Array.isArray(data) ? data : []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [API_URL]);

  async function handleCreated() {

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMovies(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h1>Movies</h1>
      {loading && <p>Loading movies...</p>}
      {error && (
        <p style={{ color: 'crimson' }}>Failed to load movies: {error}</p>
      )}
      {!loading && !error && (
        <>
          <MovieForm apiUrl={API_URL} onCreated={handleCreated} />
          <MovieList movies={movies} />
        </>
      )}
    </main>
  );
}
