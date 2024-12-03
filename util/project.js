import { properties as properties_, localization as localization_ } from "./index.js"
const preview = (project) => {
	console.log(project)
}

const we = (template) => {
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

  const {properties,properties_we} = properties_.all(template)
  const localization = localization_.we(properties)

  project.general.properties = properties_we
  project.general.localization = localization

  return {project,properties}
}
export {we,preview}