const BASE_URL = "http://4.224.186.213/evaluation-service";

const VALID_STACKS = ["frontend", "backend"];
const VALID_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const VALID_PACKAGES = [
  "api", "component", "hook", "page", "state", "style",
  "auth", "config", "middleware", "utils"
];

async function getToken() {
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
const TOKEN_TTL_MS = 14 * 60 * 1000; // refresh every 14 minutes

async function getValidToken() {
  const now = Date.now();
  if (!cachedToken || !tokenFetchedAt || (now - tokenFetchedAt) > TOKEN_TTL_MS) {
    cachedToken = await getToken();
    tokenFetchedAt = now;
  }
  return cachedToken;
}

async function Log(stack, level, pkg, message) {
  if (!VALID_STACKS.includes(stack)) {
    throw new Error(`Invalid stack: ${stack}`);
  }
  if (!VALID_LEVELS.includes(level)) {
    throw new Error(`Invalid level: ${level}`);
  }
  if (!VALID_PACKAGES.includes(pkg)) {
    throw new Error(`Invalid package: ${pkg}`);
  }

  const token = await getValidToken();

  const response = await fetch(`${BASE_URL}/logs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      stack,
      level,
      package: pkg,
      message
    })
  });

  const data = await response.json();
  return data;
}

export default Log;