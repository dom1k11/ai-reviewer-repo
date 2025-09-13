export async function apiRequest<T = unknown>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  token: string,
  body?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(`http://localhost:3000${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!res.ok) throw new Error(`Failed: ${res.status}`);

  return res.json() as Promise<T>;
}
