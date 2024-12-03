import { MISSING_TRANSLATION } from "./constants.js"
import * as object from "./object.js"

const by_path_without_fallback = (localization,path) => {
  const value = object.value_by_path(localization,path)
  if (typeof value === "string") {
    return value
  }
  if (value?.self !== undefined && typeof value.self === "string") {
    return value.self
  }
  return null
}

const by_path = (localization,path) => {
  const result = {}
  // const missing = {}
  const global = by_path_without_fallback(localization.global,path)
  for (const language in localization.local) {
    const local = by_path_without_fallback(localization.local[language],path)
    if (local === null) {
      if (global === null) {
        // result[language] = path.join("_")
        console.warn(MISSING_TRANSLATION,language + "." + path.join("."))
        continue
      }
      result[language] = global
      continue
    }
    result[language] = local
  } 
  return result
}

const we = (properties) => {
  const localization = {}
  for(const value of properties) {
      for (const language in value.localization) {
        if (localization[language] === undefined) {
          localization[language] = {}
        }
        const localization_ = value.localization[language]
        localization[language][value.label] = localization_.combined
      }
  }
  return localization
}

export {by_path,by_path_without_fallback,we}