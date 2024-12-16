const value_by_path = (object,path) => {
  let current = object
  for (let part of path) {
    const next = current?.[part]
    if (next === undefined) {
      return null
    }
    current = next
  }
  return current
}
export {value_by_path}