const we = (conditions) => {
  if (conditions.length < 1) {
    return ""
  }
  let result = ""
  const len = conditions.length-1
  // в след версии сделать все кондишены
  function cond(a,b) {
    return a.join("_") + ".value == " + b
  } 
  for (let i = 0; i < len; i++) {
    const condition = conditions[i]
    result += cond(condition.a,condition.b) + " && "
  }
  const condition = conditions[len]
  result += cond(condition.a,condition.b)
  return result
}
export {we}