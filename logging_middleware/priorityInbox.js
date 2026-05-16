import Log from "./index.js";

const BASE_URL = "http://4.224.186.213/evaluation-service";

const TYPE_WEIGHTS = {
  Placement: 3,
  Result: 2,
  Event: 1
};

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

async function fetchAllNotifications(token) {
  let page = 1;
  let allNotifications = [];

  while (true) {
    const response = await fetch(`${BASE_URL}/notifications?limit=10&page=${page}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await response.json();

    if (!data.notifications || data.notifications.length === 0) break;

    allNotifications = [...allNotifications, ...data.notifications];

    if (data.notifications.length < 10) break;

    page++;
  }

  await Log("frontend", "info", "api", `Fetched ${allNotifications.length} notifications across ${page} pages`);
  return allNotifications;
}

function scoreNotification(notification) {
  const typeWeight = TYPE_WEIGHTS[notification.Type] || 0;

  const timestamp = new Date(notification.Timestamp).getTime();
  const now = Date.now();
  const ageMs = now - timestamp;
  const ageHours = ageMs / (1000 * 60 * 60);

  // recency score: newer = higher, decays over 72 hours
  const recencyScore = Math.max(0, 1 - ageHours / 72);

  // final score: type weight is primary, recency is tiebreaker
  const finalScore = typeWeight + recencyScore;

  return { ...notification, score: finalScore };
}

export async function getPriorityInbox(topN = 10) {
  const token = await getToken();
  const notifications = await fetchAllNotifications(token);

  const scored = notifications.map(scoreNotification);
  scored.sort((a, b) => b.score - a.score);

  const result = scored.slice(0, topN);

  await Log("frontend", "info", "utils", `Priority inbox computed, returning top ${topN} notifications`);
  return result;
}

// test run
const top10 = await getPriorityInbox(10);
console.log(JSON.stringify(top10, null, 2));