const TYPE_WEIGHTS = {
  Placement: 3,
  Result: 2,
  Event: 1
};

function scoreNotification(notification) {
  const typeWeight = TYPE_WEIGHTS[notification.Type] || 0;
  const timestamp = new Date(notification.Timestamp).getTime();
  const now = Date.now();
  const ageHours = (now - timestamp) / (1000 * 60 * 60);
  const recencyScore = Math.max(0, 1 - ageHours / 72);
  return { ...notification, score: typeWeight + recencyScore };
}

export function getPriorityInbox(notifications, topN = 10) {
  const scored = notifications.map(scoreNotification);
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topN);
}