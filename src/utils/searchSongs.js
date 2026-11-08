import alphabetData from "../../data/songsData";

// One search rule shared by the Home suggestions and the FilteredTitles screen,
// so "See all results" always shows exactly the songs the dropdown listed.
export const searchSongs = (query) => {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return [];

  const results = [];

  Object.keys(alphabetData).forEach((letter) => {
    alphabetData[letter].forEach((item) => {
      if (
        Array.isArray(item.keywords) &&
        item.keywords.some(
          (kw) => typeof kw === "string" && kw.toLowerCase().startsWith(q)
        )
      ) {
        results.push(item);
      }
    });
  });

  return results;
};