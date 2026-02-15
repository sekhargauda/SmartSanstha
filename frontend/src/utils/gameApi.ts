export const trackGame = async (token: string, payload: any) => {
  const res = await fetch("http://localhost:5000/api/games/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};
