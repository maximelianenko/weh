
class Warnings {
   constructor(that) {
      this.__parent__ = that
   }
   translation_missing = (text) => {
      if (!this.__parent__.params.translation_suppress_warnings) {
         console.warn(this.__parent__.params.translation_missing, text)
       }
   }
}


export default Warnings