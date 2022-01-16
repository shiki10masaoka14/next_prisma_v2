export const fetcher = async (url: string, data) => {
  const res = await fetch(url, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
