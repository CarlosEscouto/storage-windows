const getLastScore = (windows: Object): number => {
  let lastScore = 0;

  Object.values(windows).map((score: number) => {
    lastScore = (score > lastScore) ? score : lastScore
  })

  return lastScore + 1;
}

export default getLastScore;