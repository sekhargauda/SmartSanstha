// backend/helpers/partHelpers.js

/**
 * Extract part number from part name
 * @param {string} partName - e.g., "Preamble", "Part III"
 * @returns {number} - Part number for sorting
 */
export function extractPartNumber(partName) {
  if (partName === 'Preamble') return 0;
  
  // Extract Roman numerals from part name (e.g., "Part III" -> "III")
  const match = partName.match(/Part\s+([IVXLCDM]+)/i);
  if (match) {
    return romanToDecimal(match[1]);
  }
  return 999; // Unknown parts go to end
}

/**
 * Convert Roman numerals to decimal
 * @param {string} roman - Roman numeral string
 * @returns {number} - Decimal number
 */
export function romanToDecimal(roman) {
  const romanMap = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    const current = romanMap[roman[i]];
    const next = romanMap[roman[i + 1]];
    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }
  return result;
}

/**
 * Get difficulty level for a part
 * @param {string} partName - e.g., "Part III", "Preamble"
 * @returns {string} - 'beginner', 'intermediate', or 'advanced'
 */
export function getDifficultyLevel(partName) {
  const difficultyMap = {
    'Preamble': 'beginner',
    'Part I': 'beginner',
    'Part II': 'intermediate',
    'Part III': 'beginner',
    'Part IV': 'beginner',
    'Part IV A': 'beginner',
    'Part IVA': 'beginner',
    'Part V': 'intermediate',
    'Part VI': 'intermediate',
    'Part VII': 'advanced',
    'Part VIII': 'intermediate',
    'Part IX': 'intermediate',
    'Part IX A': 'intermediate',
    'Part IXA': 'intermediate',
    'Part IX B': 'advanced',
    'Part IXB': 'advanced',
    'Part X': 'advanced',
    'Part XI': 'advanced',
    'Part XII': 'advanced',
    'Part XIII': 'advanced',
    'Part XIV': 'advanced',
    'Part XIV A': 'advanced',
    'Part XIVA': 'advanced',
    'Part XV': 'intermediate',
    'Part XVI': 'intermediate',
    'Part XVII': 'intermediate',
    'Part XVIII': 'intermediate',
    'Part XIX': 'advanced',
    'Part XX': 'intermediate',
    'Part XXI': 'advanced',
    'Part XXII': 'beginner'
  };

  // Try exact match first
  if (difficultyMap[partName]) {
    return difficultyMap[partName];
  }

  // Try case-insensitive match
  const partNameLower = partName.toLowerCase();
  for (const [key, value] of Object.entries(difficultyMap)) {
    if (key.toLowerCase() === partNameLower) {
      return value;
    }
  }

  // Default to intermediate if not found
  console.warn(`⚠️ No difficulty mapping found for part: ${partName}, using 'intermediate'`);
  return 'intermediate';
}