import { useState } from 'react';
import styled from 'styled-components';
import type { Meme } from '../interfaces/memes';

const MemeBox = styled.main`
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

const GenerateButton = styled.button`
  padding: 10px 18px;
  border: 0;
  border-radius: 6px;
  background: #2563eb;
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }
`;

const MemeImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  margin: 20px auto 0;
  object-fit: contain;
`;

interface MemesProps {
  data: Meme[];
}

export default function Memes({ data }: MemesProps) {
  const [meme, setMeme] = useState<Meme | null>(null);

  const generateMeme = () => {
    if (data.length === 0) return;

    const alternatives = data.filter((item) => item.id !== meme?.id);
    const choices = alternatives.length > 0 ? alternatives : data;
    const nextMeme = choices[Math.floor(Math.random() * choices.length)];
    if (nextMeme) setMeme(nextMeme);
  };

  return (
    <MemeBox>
      <h1>Generate meme</h1>
      <GenerateButton type="button" onClick={generateMeme}>
        Generate meme
      </GenerateButton>
      {meme ? (
        <>
          <h2>{meme.name}</h2>
          <p>Size: {meme.width}×{meme.height}</p>
          <p>Text boxes: {meme.box_count}</p>
          <p>{meme.captions}</p>
          <MemeImage src={meme.url} alt={meme.name} />
        </>
      ) : (
        <p>Click the button to get a random meme.</p>
      )}
    </MemeBox>
  );
}