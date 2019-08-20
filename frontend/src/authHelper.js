export function checkLoggedId () {
  return !!getAccessToken()
}

export function getAccessToken () {
  return localStorage.getItem('access_token')
}

export function generateAccessToken () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function login () {
  const uuid = generateAccessToken()
  localStorage.setItem('access_token', uuid)
}

export function logout () {
  localStorage.removeItem('access_token')
}
