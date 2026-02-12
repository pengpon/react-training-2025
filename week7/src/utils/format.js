export const addThousandsSeparator = (value, separator=',') =>{
  if (value === null) return ''
  return value.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, separator)
}