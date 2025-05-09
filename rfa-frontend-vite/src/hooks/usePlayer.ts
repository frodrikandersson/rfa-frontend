import { useState } from 'react';
import { fetchPlayer } from '../services/playerService';
import type { PlayerResponse } from '../models/IPlayer';

export const usePlayer = () => {
  const [data, setData] = useState<PlayerResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPlayer = async (fid: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchPlayer(fid);
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch player.');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getPlayer };
};