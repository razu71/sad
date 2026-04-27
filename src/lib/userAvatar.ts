const BASE = '/images/user'

const KNOWN: Record<string, 1 | 2 | 3> = {
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 1,
  'demo-1': 1,
}

function imageIndexForUserId(userId: string): 1 | 2 | 3 {
  if (Object.prototype.hasOwnProperty.call(KNOWN, userId)) {
    return KNOWN[userId]!
  }
  const digits = userId.match(/\d+/g)
  if (digits?.length) {
    const n = parseInt(digits.join('').slice(0, 6), 10) || 1
    return ((n - 1) % 3) + 1 as 1 | 2 | 3
  }
  return 1
}

export function userAvatarImageUrl(userId: string, size: 'sm' | 'md' = 'sm'): string {
  const n = imageIndexForUserId(userId)
  if (size === 'sm') {
    return `${BASE}/${n}-small.png`
  }
  return `${BASE}/${n}.png`
}
