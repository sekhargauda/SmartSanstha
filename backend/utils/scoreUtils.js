// backend/utils/scoreUtils.js

export const calculateTotalScore = (stats) => {
  let totalQuizScore = 0;

  if (stats.quizzesScore) {
    for (let value of stats.quizzesScore.values()) {
      totalQuizScore += value;
    }
  }

  return (
    (stats.articleScore || 0) +
    (stats.gameScore || 0) +
    totalQuizScore
  );
};
