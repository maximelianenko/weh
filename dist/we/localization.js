import * as object from "../util/object.js"
// import * as warnings from "./warnings.js"

class Localization {
  constructor(that) {
    this.__parent__ = that
  }
  by_path_without_fallback = (localization,path) => {
    const value = object.value_by_path(localization,path)
    if (typeof value === "string") {
      return value
    }
    if (value?.self !== undefined && typeof value.self === "string") {
      return value.self
    }
    return null
  }
  
  by_path = (localization,path) => {
    const result = {}
    // const missing = {}
    const global = this.by_path_without_fallback(localization.global,path)
    for (const language in localization.local) {
      const local = this.by_path_without_fallback(localization.local[language],path)
      if (local === null) {
        if (global === null) {
          this.__parent__.warnings.translation_missing(language + "." + path.join("."))
          continue
        }
        result[language] = global
        continue
      }
      result[language] = local
    } 
    return result
  }
  
  we = (properties) => {
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
}

export default Localization