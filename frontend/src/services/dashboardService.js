/**
 * Dashboard Service
 * Fetches dashboard stats, activity graph data, insights, and memory categories.
 * Replace mock implementations with real API calls when backend is ready.
 */

const MOCK_STATS = {
  documentsIndexed: { value: 2841, change: 124, changeLabel: 'this week' },
  activeTasks:      { value: 23,   change: 5,   changeLabel: 'since yesterday' },
  memoryConflicts:  { value: 7,    change: -3,  changeLabel: 'resolved today' },
  insightsGenerated:{ value: 384,  change: 47,  changeLabel: 'this week' },
}

const MOCK_ACTIVITY_GRAPH = [
  { day: 'Mon', queries: 82,  documents: 12, insights: 34 },
  { day: 'Tue', queries: 118, documents: 19, insights: 41 },
  { day: 'Wed', queries: 94,  documents: 8,  insights: 38 },
  { day: 'Thu', queries: 147, documents: 24, insights: 55 },
  { day: 'Fri', queries: 131, documents: 31, insights: 62 },
  { day: 'Sat', queries: 56,  documents: 4,  insights: 21 },
  { day: 'Sun', queries: 73,  documents: 7,  insights: 29 },
]

/**
 * @returns {Promise<typeof MOCK_STATS>}
 */
export async function getDashboardStats() {
  // TODO: Replace with: return fetch('/api/dashboard/stats').then(r => r.json())
  return Promise.resolve(MOCK_STATS)
}

/**
 * @returns {Promise<typeof MOCK_ACTIVITY_GRAPH>}
 */
export async function getActivityGraph() {
  // TODO: Replace with: return fetch('/api/dashboard/activity').then(r => r.json())
  return Promise.resolve(MOCK_ACTIVITY_GRAPH)
}
