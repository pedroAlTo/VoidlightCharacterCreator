
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Character } from '../types/voidlight';

interface GeminiBackstoryGeneratorProps {
  character: Character;
  onBackstoryGenerated: (backstory: string) => void;
}

const GeminiBackstoryGenerator: React.FC<GeminiBackstoryGeneratorProps> = ({ character, onBackstoryGenerated }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateBackstory = async () => {
    if (!process.env.API_KEY) {
      setError("API key is not configured. This feature is unavailable.");
      return;
    }
    if (!character.ancestry || !character.characterClass || !character.community) {
        alert("Please select Ancestry, Community, and Class before generating a backstory.");
        return;
    }

    setIsLoading(true);
    setError(null);

    const prompt = `
      Generate a short, compelling backstory (2-3 paragraphs) for a character in the sci-fi TTRPG 'Voidlight'.
      The setting is a 'hopepunk' post-apocalypse, a century after a galactic cataclysm called "The Great Silence" shattered civilization and the laws of physics. Life is harsh, but people are resilient.

      Character Details:
      - Name: ${character.name}
      - Ancestry: ${character.ancestry.name}. (${character.ancestry.overview})
      - Community: ${character.community.name}. (${character.community.description})
      - Class: ${character.characterClass.name}. (${character.characterClass.description})
      - Key Experience: "${character.experience}"

      Based on these details, write a backstory that weaves them together. The tone should be scarred but hopeful. It should hint at why they chose their class and how their key experience shaped them. Do not use markdown formatting.
    `;

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
          role: 'user',
          parts: [{ text: prompt }],
        },
      });
      
      const backstoryText = response.text;
      onBackstoryGenerated(backstoryText);

    } catch (e) {
      console.error(e);
      setError("Failed to generate backstory. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={generateBackstory}
        disabled={isLoading}
        className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-600/30 disabled:bg-gray-700 disabled:cursor-wait"
      >
        {isLoading ? 'Generating with AI...' : '✨ Generate Backstory with AI'}
      </button>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default GeminiBackstoryGenerator;
