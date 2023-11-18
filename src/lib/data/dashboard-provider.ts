import type { DashboardModel } from '../models/dashboard-model'
import type { GithubStatsItem } from '../models/github-stats-item'
import type { WakatimeItem } from '../models/wakatime-item'
import { getGithubStats } from './data-sources/remote/dashboard/github'
import { getWakatimeStats } from './data-sources/remote/dashboard/wakatime'

export async function getDashboardData(): Promise<DashboardModel> {
  const wakatimeStats = await getWakatimeData()
  const githubStats = await getGithubStatsData()

  return {
    githubStats,
    wakatime: wakatimeStats
  }
}

async function getGithubStatsData(): Promise<GithubStatsItem> {
  const githubStats = await getGithubStats()

  if (!githubStats.ok) {
    console.log(githubStats.error)
  }

  return githubStats.ok
    ? githubStats.data
    : {
        followers: 0,
        stars: 0,
        contributions: 0
      }
}

async function getWakatimeData(): Promise<WakatimeItem | null> {
  const wakatimeStats = await getWakatimeStats()

  if (!wakatimeStats.ok) {
    console.log(wakatimeStats.error)

    return null
  }

  const formatTime = wakatimeStats.data.text?.split(' ').slice(0, 2).join(' ')

  return {
    time: formatTime
  }
}
