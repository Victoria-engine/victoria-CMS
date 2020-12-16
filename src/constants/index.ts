export const API_URL = process.env.REACT_APP_API_URL

export const USER_ROLES = Object.freeze({
  USER: 0,
  ADMIN: 1,
})

export const ACCESS_TOKEN = 'victoria_a_t'

export const GoogleOAuth2ClientCredentials = {
  id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  redirect_uri: 'http://localhost:7777/login',
  scopes: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
}
