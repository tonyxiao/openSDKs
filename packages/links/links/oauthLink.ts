import type {Link} from '../link'

// MARK: Oauth links

export interface OauthTokens {
  accessToken: string
  refreshToken?: string
  /** ISO string */
  expiresAt: string | null
}
// TODO: Test me out

export function oauthLink({
  tokens,
  refreshThresholdMs = 5 * 60 * 1000, // 5 minutes
  onTokenRefreshed,
  refreshTokens,
}: {
  tokens: OauthTokens
  refreshThresholdMs?: number
  refreshTokens?: (token: OauthTokens) => Promise<OauthTokens>
  onTokenRefreshed?: (tokens: OauthTokens) => void
}): Link {
  return async (req, next) => {
    if (
      refreshTokens &&
      (!tokens.expiresAt ||
        Date.parse(tokens.expiresAt) < Date.now() + refreshThresholdMs)
    ) {
      tokens = await refreshTokens(tokens)
      onTokenRefreshed?.(tokens)
    }
    // Does this work? Or will it break because of the readonly nature of the headers?
    req.headers.set('authorization', `Bearer ${tokens.accessToken}`)
    // Also can add support for re-active checking
    return next(req)
  }
}
