
const independentVowels = {
  "అ": "a",
  "ఆ": "aa",
  "ఇ": "i",
  "ఈ": "ee",
  "ఉ": "u",
  "ఊ": "oo",
  "ఋ": "ru",
  "ౠ": "ruu",
  "ఎ": "ye",
  "ఏ": "yee",
  "ఐ": "ai",
  "ఒ": "o",
  "ఓ": "oo",
  "ఔ": "av",
};

const vowelSigns = {
  "ా": "aa",
  "ి": "i",
  "ీ": "ee",
  "ు": "u",
  "ూ": "oo",
  "ృ": "ru",
  "ౄ": "ruu",
  "ె": "e",
  "ే": "e",
  "ై": "ai",
  "ొ": "o",
  "ో": "o",
  "ౌ": "au",
};

const consonants = {
  "క": "k",
  "ఖ": "kh",
  "గ": "g",
  "ఘ": "gh",
  "ఙ": "ng",
  "చ": "ch",
  "ఛ": "chh",
  "జ": "j",
  "ఝ": "jh",
  "ఞ": "ny",
  "ట": "t",
  "ఠ": "th",
  "డ": "d",
  "ఢ": "dh",
  "ణ": "n",
  "త": "th",
  "థ": "th",
  "ద": "dh",
  "ధ": "dh",
  "న": "n",
  "ప": "p",
  "ఫ": "f",
  "బ": "b",
  "భ": "bh",
  "మ": "m",
  "య": "y",
  "ర": "r",
  "ఱ": "r",
  "ల": "l",
  "ళ": "l",
  "వ": "v",
  "శ": "sh",
  "ష": "sh",
  "స": "s",
  "హ": "h",
  "క్ష": "ksha",
  "జ్ఞ": "gnya",
};

const signs = {
  "ం": "m",
  "ఁ": "m",
  "ః": "h",
  "ఽ": "'",
};

const VIRAMA = "్";
const VOWEL_START = "అ".codePointAt(0);
const VOWEL_END = "ఔ".codePointAt(0);

export function transliterateTelugu(text = "") {
  const chars = Array.from(String(text));
  let result = "";

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const next = chars[i + 1];

    // Independent vowels
    if (independentVowels[char]) {
      result += independentVowels[char];
      continue;
    }

    // Consonants with an inherent "a" vowel
    if (consonants[char]) {
      result += consonants[char];

      if (next === VIRAMA) {
        // A virama suppresses the inherent vowel.
        i++;
      } else if (vowelSigns[next]) {
        result += vowelSigns[next];
        i++;
      } else if (
        next === "ె" ||
        next === "ొ"
      ) {
        // Kept as a fallback for unusual input.
        result += vowelSigns[next];
        i++;
      } else {
        result += "a";
      }

      continue;
    }

    // Telugu vowel signs that appear without a consonant
    if (vowelSigns[char]) {
      result += vowelSigns[char];
      continue;
    }

    // Anusvara, chandrabindu, visarga and avagraha
    if (signs[char]) {
      result += signs[char];
      continue;
    }

    // Preserve spaces, punctuation, numbers, English text,
    // and all other characters.
    result += char;
  }

  return result;
}
