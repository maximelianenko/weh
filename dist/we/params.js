class Params {
   constructor(that) {
      this.__parent__ = that
   }
   translation_missing = "missing translation at"
   translation_suppress_warnings = false
   group_as_text = true
   nesting_enabled = true
   nesting_symbol = "　"
}
export default Params