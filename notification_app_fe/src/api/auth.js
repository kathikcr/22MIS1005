const BASE_URL = "/api";

export async function getToken() {
  const response = await fetch(`${BASE_URL}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "karthik.cr2022@vitstudent.ac.in",
      name: "Karthik C R",
      rollNo: "22MIS1005",
      accessCode: "SfFuWg",
      clientID: "ec480c59-86ee-4ca1-95e5-67bccc733cdf",
      clientSecret: "mjjDcwTxqwhJVUGT"
    })
  });
  const data = await response.json();
  return data.access_token;
}

let cachedToken = null;
let tokenFetchedAt = null;
const TOKEN_TTL_MS = 14 * 60 * 1000;

export async function getValidToken() {
  const now = Date.now();
  if (!cachedToken || !tokenFetchedAt || (now - tokenFetchedAt) > TOKEN_TTL_MS) {
    cachedToken = await getToken();
    tokenFetchedAt = now;
  }
  return cachedToken;
}