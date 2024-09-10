import { ALPHABETICAL_CHARS, DECIMAL_NUMBERS } from '../../utils/const';

export const morseChars =
  '.- -... -.-. -.. . ..-. --. .... .. .--- -.- .-.. -- -. --- .--. --.- .-. ... - ..- ...- .-- -..- -.-- --.. .---- ..--- ...-- ....- ..... -.... --... ---.. ----. ----- /';

export const englishCharsArr = (ALPHABETICAL_CHARS + DECIMAL_NUMBERS + ' ').split('');
export const morseCharsArr = morseChars.split(' ');

export const englishToMorseMap = new Map(englishCharsArr.map((char, index) => [char, morseCharsArr[index]]));
export const morseToEnglishMap = new Map(morseCharsArr.map((char, index) => [char, englishCharsArr[index]]));
