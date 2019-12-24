import Cookies from 'js-cookie'
// const TokenKey = 'ttz_token'
export function getToken(TokenKey) {
  return Cookies.get(TokenKey)
}

export function setToken(TokenKey,token) {
  return Cookies.set(TokenKey, token,{expires:1})
}

export function removeToken(TokenKey) {
  return Cookies.remove(TokenKey)
}
