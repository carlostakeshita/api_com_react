import MovieItem from './MovieItem';
import styles from '../styles/MovieList.module.css';

export default function MovieList({ movies = [] }) {
  if (!movies.length) {
    return <p className={styles.empty}>No movies available.</p>;
  }

  return (
    <section className={styles.list}>
      {movies.map((m) => (
        <MovieItem key={m.id || m._id || m.title} movie={m} />
      ))}
    </section>
  );
}
