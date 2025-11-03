
import { Character } from '../types/voidlight';

export function exportCharacter(character: Character): void {
  const jsonString = JSON.stringify(character, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${character.name.replace(/\s+/g, '_')}_voidlight.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importCharacter(): Promise<Character> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];

      if (!file) {
        return reject(new Error('No file selected.'));
      }

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const text = e.target?.result;
          if (typeof text !== 'string') {
            throw new Error('File content is not a string.');
          }
          const character = JSON.parse(text) as Character;
          // Basic validation
          if (character && character.id && character.name && character.ancestry) {
            resolve(character);
          } else {
            throw new Error('Invalid character file format.');
          }
        } catch (err) {
          reject(new Error(`Error parsing file: ${(err as Error).message}`));
        }
      };

      reader.onerror = () => {
        reject(new Error('Error reading file.'));
      };

      reader.readAsText(file);
    };

    input.click();
  });
}
