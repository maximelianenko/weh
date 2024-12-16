import * as string from "./string.js"
import * as float from "./float.js"

import Color from "color"

const unwrap = (property) => {
	if (typeof property === "object" && property.value !== undefined) {
		const value = property.value
		if (property.params !== undefined && typeof property.params === "object") {
			return {value,params:property.params}
		}
		return {value, params: null}
	}
	return {value: property, params: null}
}

const identify = (property) => {
	const {value,params} = unwrap(property)
	const type = typeof value
	if (type === "string") {
    if (params !== null) {
      if (params.type === "text") {
        return {type: "text",value,params}
      }
      if (params.type === "file") {
        return {type: "file",value,params}
      }
      if (params.type === "directory") {
        if (params.mode !== undefined) {
          return {type: "directory",value,params}
        }
        return {type: "directory",value,params:{...params, mode:"fetchall"}}
      }
    }
		const {type: exact_type, color} = string.identify(value)
		if (color !== undefined) {
			return {type: exact_type,color,value,params}
		}
		return {type: exact_type,value,params}
	}
	return {type,value,params}
}

const min_for = (value,params,round) => {
  if (params !== null && params.min !== undefined && typeof params.min === "number" && params.min <= value) {
    return params.min
  }
  const sign = Math.sign(value)
  const negative = sign === -1
  if (negative) {
    return sign * Math.ceil(Math.abs(value)/round)*round
  }
  return 0
}

const max_for = (value,params,round) => {
  if (params !== null && params.max !== undefined && typeof params.max === "number" && params.max >= value) {
    return params.max
  }
  const sign = Math.sign(value)
  const negative = sign === -1
  if (!negative) {
    return Math.ceil(Math.max(1,value)/round)*round
  }
  return 0
}
const format_boolean = (value) => {
  return {
    value,
    params:{
      type: "bool"
    }
  }
}
const color_into_we_format = (value) => {
  const color = Color(value)
  const color_rgb = color.rgb().array()
  const color_rgb_float = color_rgb.map(el => el/255)
  const value_converted = color_rgb_float.join(" ")
  return value_converted
}
const format_color = (value) => {
  return {
    value: color_into_we_format(value),
    unformatted: value,
    params:{
      type: "color"
    }
  }
}
const format_float = (value,params) => {
  const {precision: precision_} = float.parts(value)

  const min = min_for(value,params,10)
  const max = max_for(value,params,10)
  const precision = params?.precision || precision_
  const step = params?.step || float.into(
    "0." + "0".repeat(precision - 1) + "1"
  )
  return {
    value,
    params: {fraction: true, max, min, precision, step, type: "slider"}
  }
}

const format_int = (value,params) => {
  const min = min_for(value,params,100)
  const max = max_for(value,params,100)
  return {
    value,
    params: {fraction: false, max, min, type: "slider"}
  }
}
const format_number = (value,params) => {
  if (Number.isInteger(value)) {
    return format_int(value,params)
  }
  return format_float(value,params)
}
 
const format_string = (value) => {
  return {
    value,
    params:{
      type: "textinput"
    }
  }
}
const format_text = (value) => {
  return {
    value,
    params:{
      type: "text"
    }
  }
}
const format_file = (value) => {
  return {
    value,
    params:{
      type: "file"
    }
  }
}
const format_directory = (value,params) => {
  return {
    value,
    params:{
      type: "directory",
      mode: params.mode
    }
  }
}
const format = (property) => {
  const {type,value,params} = identify(property)
  if (type === "boolean") {
    return format_boolean(value)
  }

  if (type === "string") {
    return format_string(value,params)
  }

  if (type === "color") {
    return format_color(value)
  }

  if (type === "number") {
    return format_number(value,params)
  }

  if (type === "file") {
    return format_file(value)
  }

  if (type === "directory") {
    return format_directory(value,params)
  }

  return format_text(value)
}



export {
	identify,
	unwrap,
	format,
	format_boolean,
	format_color,
	format_float,
	format_int,
	format_number,
	format_string,
	format_text
}