import { MISSING_TRANSLATION } from "./constants.js"

const preview = (properties,language) => {
	let result = "\n"
	for (let value of properties) {
		const localization = value?.localization?.[language]
		if (localization === undefined) {
			console.warn(MISSING_TRANSLATION, language + "." + value.path.join("."))
			result += "\u0009" + value.key + "\n"
			continue
		}
		result += "\u0009" + localization.combined  + "   (" + value.property.params.type +  ")\n"
	}
	result+= "\n"
	return result
}

export {preview}