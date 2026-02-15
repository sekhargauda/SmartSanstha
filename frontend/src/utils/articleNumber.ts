// frontend/src/utils/articleNumber.ts
export const normalizeArticleId = (raw: string): string => {
  const str = raw.trim();
  if (str.toLowerCase().includes("preamble")) return "0";
  const match = str.match(/(\d+[A-Za-z]*)/);
  return match ? match[1] : str;
};

