import styles from '../styles/MovieItem.module.css';

export default function MovieItem({ movie }) {

  const title = movie.title || movie.name || 'Untitled';
  const year = movie.year || movie.releaseYear || movie.date || '';
  const director = movie.director || movie.directorName || '';
  const description = movie.description || movie.overview || movie.plot || '';

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {year && <span className={styles.year}>{year}</span>}
      </div>
      {director && <div className={styles.meta}>Director: {director}</div>}
      {description && <p className={styles.desc}>{description}</p>}
    </article>
  );
}
