import React from 'react';

interface AlphabetFilterProps {
  selectedLetter: string;
  onLetterSelect: (letter: string) => void;
}

const AlphabetFilter: React.FC<AlphabetFilterProps> = ({ selectedLetter, onLetterSelect }) => {
  const alphabet = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="flex justify-center flex-wrap gap-2 bg-white rounded-lg shadow-lg p-4">
      {alphabet.map((letter) => (
        <button
          key={letter}
          onClick={() => {
            if (selectedLetter === letter) {
              onLetterSelect('');
            } else {
              onLetterSelect(letter);
            }
          }
        }
          className={`w-8 h-8 flex items-center justify-center rounded-full 
            ${selectedLetter === letter 
              ? 'bg-indigo-600 text-white' 
              : 'hover:bg-indigo-100 text-gray-600 hover:text-indigo-600'}`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default AlphabetFilter;