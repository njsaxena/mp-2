import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Memes from './components/Memes';
import type { Meme } from './interfaces/memes';

const MessageBox = styled.main`
  width: 90%;
  margin: 48px auto;
  padding: 24px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background: #fff;
  color: #111827;
  font-family: Arial, sans-serif;
  text-align: center;
`;

interface Imgmeme {
  success: boolean;
  data: {
    memes: Meme[];
  };
}

export default function App() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        console.log('Fetching memes…');
        const rawData = await fetch('https://api.imgflip.com/get_memes');

        if (!rawData.ok) {
          throw new Error(`Network error: ${rawData.status} ${rawData.statusText}`);
        }

        const json = (await rawData.json()) as Imgmeme;

        if (!json.success || !json.data) {
          throw new Error('Unexpected API response');
        }

        console.log('Data fetched successfully. Count:', json.data.memes.length);
        setMemes(json.data.memes);
        setError(null);
      } catch (e) {
        console.log('There was the error:', e);
        setError((e as Error).message);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return (
      <MessageBox>
        <p>Failed to load memes: {error}</p>
      </MessageBox>
    );
  }

  return <Memes data={memes} />;
}

