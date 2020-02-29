import Cookies from 'js-cookie'

export const setCookie = (name: string, value: string, opts?: Cookies.CookieAttributes) => {
  Cookies.set(name, value, opts)
}

export const removeCookie = (name: string, opts?: Cookies.CookieAttributes) => {
  Cookies.remove(name, opts)
}

export const getCookie = (name: string) => {
  return Cookies.get(name)
}