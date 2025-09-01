export async function fetchMe(token: string) {
  const res = await fetch("http://localhost:3000/me", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(`Failed: ${res.status}`);

  return res.json();
}

export async function getUser(token: string) {
  const res = await fetch("http://localhost:3000/me/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(`Failed: ${res.status}`);

  return res.json();
}
