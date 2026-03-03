export const setCookie = (name, value, expired) => {
  const expires = "; expires=" +  new Date(expired).toUTCString()
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${expires}; path=/; Secure; SameSite=Strict`
}

export const getCookie = (name) => {
  return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
}

export const removeCookie = (name) => {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict`;
}