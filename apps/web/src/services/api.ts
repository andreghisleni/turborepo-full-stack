import { env } from '@/env';
import axios from 'axios';

const api = axios.create({
  baseURL: `${env.NEXT_PUBLIC_VERCEL_URL}/api`,
});

export { api };
