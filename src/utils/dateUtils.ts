import TimeAgo from 'javascript-time-ago'

// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'
// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en)

export const getTimestamp = (timestamp: string | number) => {
  return new Date(timestamp)
}

export const transformToLocalDate = (timestamp: string | number) => {
  return new Date(timestamp).toLocaleDateString()
}

export const getRelativeDate = (current: string) => {
  return timeDifference(current)
}

function timeDifference(current: string) {
  if (!current) return

  const timeAgo = new TimeAgo('en-GB')
  return timeAgo.format(new Date(current))
}