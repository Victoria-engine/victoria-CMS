import * as queryString from 'query-string'
import { GoogleOAuth2ClientCredentials } from '../constants'

export const stringifiedParams = queryString.stringify({
  client_id: GoogleOAuth2ClientCredentials.id,
  redirect_uri: GoogleOAuth2ClientCredentials.redirect_uri,
  scope: GoogleOAuth2ClientCredentials.scopes.join(' '), // space seperated string
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
})