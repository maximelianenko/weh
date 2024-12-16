// import * as properties_ from "./properties.js"
// import * as localization_ from "./localization.js"
class Project {
  constructor(that) {
    this.__parent__ = that
  }
  we = (template) => {
    const project = {...template.project}
  
    if (project.file === undefined) {
      project.file = "index.html"
    }
    if (project.title === undefined) {
      project.title = "wallpaper"
    }
    if (project.type === undefined) {
      project.type = "web"
    }
    if (project.version === undefined) {
      project.version = 0
    }
  
    project.general = {}
    if (project.supportsaudioprocessing !== undefined) {
      project.general.supportsaudioprocessing = project.supportsaudioprocessing
      delete project.supportsaudioprocessing
    }
  
    else if (project.audioprocessing !== undefined) {
      project.general.supportsaudioprocessing = project.audioprocessing
      delete project.audioprocessing
    }
  
    else {
      project.general.supportsaudioprocessing = true
    }
  
    const {properties,properties_we} =  this.__parent__.properties.all(template)
    const localization = this.__parent__.localization.we(properties)
  
    project.general.properties = properties_we
    project.general.localization = localization
  
    return {project,properties}
  }
}
export default Project