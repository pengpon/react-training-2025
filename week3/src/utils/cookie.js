export const setCookie = (name, value, expired) => {
  const expires = "expires=" +  new Date(expired).toUTCString()
  document.cookie = name + "=" + value + ";" + expires + ";path=/;Secure;SameSite=Strict"
}

export const getCookie = (name) => {
  return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
}