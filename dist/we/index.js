import Localization from "./localization.js"
import Properties from "./properties.js"
import Warnings from "./warnings.js"
import Project from "./project.js"
import Params from "./params.js"

class WEH {
   constructor() {
      this.params = new Params(this)
      this.warnings = new Warnings(this)
      this.localization = new Localization(this)
      this.properties = new Properties(this)
      this.project = new Project(this)
   }

   preview = (properties,language) => {
      let result = "\n"
      for (let value of properties) {
         const localization = value?.localization?.[language]
         if (localization === undefined) {
            this.warnings.translation_missing(language + "." + value.path.join("."))
            result += "\u0009" + value.key + "\n"
            continue
         }
         result += "\u0009" + localization.combined  + "   (" + value.property.params.type +  ")\n"
      }
      result+= "\n"
      return result
   }
}


export default WEH