import { useMemo } from 'react';

export function useAlphabetFilter<T>(
  items: T[],
  selectedLetter: string,
  getSearchString: (item: T) => string
) {
  return useMemo(() => {
    if (selectedLetter === '#') {
      return items.filter(item => {
        const firstChar = getSearchString(item).charAt(0).toUpperCase();
        return !(/[A-Z]/).test(firstChar);
      });
    }
    
    if (selectedLetter) {
      return items.filter(item => 
        getSearchString(item).toUpperCase().startsWith(selectedLetter)
      );
    }
    
    return items;
  }, [items, selectedLetter, getSearchString]);
}