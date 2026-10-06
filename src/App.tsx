import { useEffect, useState } from 'react';
import Memes from './components/Memes';
import type { Meme } from './interfaces/memes';

interface Imgmeme {
  success: boolean;
  data: {
    memes: Meme[];
  };
}

export default function App() {
  const [memes, setMemes] = useState<Meme[]>([]);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const rawData = await fetch('https://api.imgflip.com/get_memes');
        const json = (await rawData.json()) as Imgmeme;

        console.log('Data fetched successfully.');
        setMemes(json.data.memes);
      } catch (e) {
        console.log('There was the error:', e);
      }
    }

    fetchData();
  }, []);

  return <Memes data={memes} />;
}

