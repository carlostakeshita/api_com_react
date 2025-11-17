import { useState } from 'react';
import styles from '../styles/MovieForm.module.css';

export default function MovieForm({ apiUrl, onCreated }) {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [director, setDirector] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, year: year ? Number(year) : undefined, director, description }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setTitle('');
      setYear('');
      setDirector('');
      setDescription('');
      if (onCreated) onCreated(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Adicionar filme</h2>
      {error && <div className={styles.error}>Erro: {error}</div>}
      <div className={styles.row}>
        <label>Título</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className={styles.row}>
        <label>Ano</label>
        <input value={year} onChange={(e) => setYear(e.target.value)} type="number" />
      </div>
      <div className={styles.row}>
        <label>Diretor</label>
        <input value={director} onChange={(e) => setDirector(e.target.value)} />
      </div>
      <div className={styles.row}>
        <label>Descrição</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className={styles.actions}>
        <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Adicionar'}</button>
      </div>
    </form>
  );
}
