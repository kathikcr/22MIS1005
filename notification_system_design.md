# Notification System Design

## Stage 1: Priority Inbox Algorithm

### Approach

The priority inbox algorithm fetches all available notifications from the API using paginated requests (max 10 per page) and scores each notification using a composite scoring formula.

### Scoring Formula
finalScore = typeWeight + recencyScore

The type weight is as follows:
Placement 3
Result 2
Event 1

Recency Score :
- Calculated as max(0, 1 - ageInHours / 72)
- Adds a value between 0 and 1
- A notification posted just now gets a score of +1
- A notification posted 72 hrs ago gets +0
- Decay is linear over 72 overs

### Why this formula

- Type weight is the primary differentiator a Placement always outranks a Result, a Result always outranks an Event regardless of age (within 72 hours)
- Recency breaks ties within the same type — a newer Placement ranks above an older Placement
- The 72 hour decay window ensures old notifications don't completely lose relevance immediately

### Steps

1. Fetch all the notifications page by page with a limit of 10 per page until there are no more results
2. Score each notifications using the above mentioned formula 
3. Sort the scores of the notifications in descending order
4. Return the top N notifications , the default is kept as 10, supports 10/15/20.

### Output

The top 10 results were all Placement type notificcations, that were sorted by recency, this confirms the algorithm correctly prioritises by the type first and then by the timestamp.

### Screenshots of the output is present under the screenshots folder

