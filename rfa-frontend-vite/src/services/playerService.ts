import axios from 'axios';
import md5 from 'md5';
import type { PlayerResponse } from '../models/IPlayer';

const API_URL = 'https://wos-giftcode-api.centurygame.com/api/player';
const SECRET = 'tB87#kPtkxqOS2';

export async function fetchPlayer(fid: number): Promise<PlayerResponse> {
  const time = Date.now();
  const form = `fid=${fid}&time=${time}`;
  const sign = md5(form + SECRET);
  const body = `sign=${sign}&${form}`;

  const response = await axios.post<PlayerResponse>(
    API_URL,
    body,
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

  return response.data;
}