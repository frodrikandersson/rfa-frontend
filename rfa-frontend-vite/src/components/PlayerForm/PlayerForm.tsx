import { useState } from 'react';
import { usePlayer } from '../../hooks/usePlayer';

const PlayerForm = () => {
  const [playerId, setPlayerId] = useState('');
  const { data, loading, error, getPlayer } = usePlayer();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(playerId);
    if (!isNaN(id)) getPlayer(id);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter Player ID"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
        />
        <button type="submit" disabled={loading}>Submit</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default PlayerForm;