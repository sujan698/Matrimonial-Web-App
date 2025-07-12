export function capitalizeFirstLetterOfEachWordInAphrase(phrase: string): string {
    if (!phrase || typeof phrase !== 'string') {
      throw new Error('Invalid input: phrase must be a non-empty string');
    }
  
    return phrase
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
  