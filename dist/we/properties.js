import * as property from "../util/property.js"
import * as conditions from "../util/conditions.js"
// import * as localization from "./localization.js"

class Properties {
  constructor(that) {
    this.__parent__ = that
  }
  flatten = (stack, properties = []) => {
    const {current,path,conditions,level,group} = stack
    let conditions_ = conditions
  
    const key_we = path.join("_")
    const label_we = "ui_" + key_we
  
    if (current?.options !== undefined && Array.isArray(current.options)) {
      properties.push({
        property: {
          value: current.value || 0,
          params: {
            type: "combo",
            options: current.options.length
          }
        },
        key: key_we,
        label: label_we,
        path,
        conditions:conditions_,
        level
      })
  
      for (let i = 0; i < current.options.length; i++) {
        const option = current.options[i]
        conditions_ = [...conditions,{
          a: path,
          b: i,
        }]
  
        this.flatten({current:option,path:[...path,"options",i],conditions:conditions_,level:level,group: false},properties) 
      }
  
      return
    }
  
    if (typeof current !== "object" || current?.value !== undefined) {
      properties.push({
        property: property.format(current),
        key: key_we,
        label: label_we,
        path,
        conditions:conditions_,
        level
      })
      return
    }
  
    if (group === true) {
      properties.push({
        property: {
          value: true,
          params: {
            type: "group",
          }
        },
        key: key_we,
        label: label_we,
        path,
        conditions:conditions_,
        level
      })
      conditions_ = [...conditions,{
        a: path,
        b: true,
      }]
    }
  
    for (let key in current) {
        const next = current[key]
        this.flatten({current:next,path:[...path,key],conditions:conditions_,level: level+1,group:true},properties)
    }
  
    return properties
  }
  
  we = (properties) => {
    const result = {}
    
    const group_type = (() => {
      if (this.__parent__.params.group_as_text) {
        return "text"
      }
      return "bool"
    })()
  
    let i = 0
    for (let value of properties) {
      const property = value.property
      const params = {...property.params}
  
      const order = 100 + i
      if (params.type === "group") {
        params.type = group_type
      }
      
      else if (params.type === "combo") {
        const options = []
        for (let i = 0; i < params.options; i++) {
          options.push({
            label: value.label + "_" + i,
            value: i
          })
        }
        params.options = options
      }
      result[value.key] = {
        value: property.value,
        ...params,
        text:value.label,
        order,
        condition: conditions.we(value.conditions)
      }
      i++
    }
    return result
  }
  
  
  with_localization = (properties_,localization_) => {
    const result = []
    const properties = this.flatten({current: properties_, path: [], conditions: [],level: -1,group:false})
    const nesting_enabled = this.__parent__.params.nesting_enabled
    const nesting_symbol = this.__parent__.params.nesting_symbol
    if (nesting_enabled) {
      for (let value of properties) {
        const value_new = {...value}
  
        const localization__ = this.__parent__.localization.by_path(localization_,value.path)
        for (const language in localization__) {
          const value_ = localization__[language]
          const nesting = nesting_symbol.repeat(value.level)
          localization__[language] = {
            value: value_,
            nesting,
            combined: nesting + value_
          }
        }
        
        value_new.localization = localization__
        result.push(value_new)
      }
    } else {
      for (let value of properties) {
        const value_new = {...value}
        const localization__ = localization.by_path(localization_,value.path)
        value_new.localization = localization__
        result.push(value_new)
      }
    }
    return result
  }
  
  all = (template) => {
    if (template.properties === undefined) {
      throw new Error("no properties in template")
    }
    if (template.localization === undefined) {
      throw new Error("no localization in template")
    }
    const properties_ = template.properties
    const localization = template.localization
    // if (template?.settings?.nesting !== undefined && typeof template.settings.nesting === "boolean") {
    //   this.__parent__.params.nesting_enabled = template.settings.nesting
    // }
    const properties = this.with_localization(properties_,localization)
    // if (template?.settings?.group?.text !== undefined && typeof template.settings.group.text === "boolean") {
    //   this.__parent__.params.group_as_text = template.settings.group.text
    // }
    const properties_we = this.we(properties)
    return {properties,properties_we}
  }
}


export default Properties