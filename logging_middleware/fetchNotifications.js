import Log from "./index.js";

const BASE_URL = "http://4.224.186.213/evaluation-service";

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

const token = await getToken();

const response = await fetch(`${BASE_URL}/notifications?limit=10&page=1`, {
  headers: {
    "Authorization": `Bearer ${token}`
  }
});

const data = await response.json();
console.log(JSON.stringify(data, null, 2));

await Log("frontend", "info", "api", "Fetched notifications successfully");