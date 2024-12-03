import Color from "color"
import _ from "lodash"
import {parse,stringify} from "yaml"
import * as weh from "./util/index.js"

const template_ = 
`project:
  title: "wallpaper"
settings:
  nesting:
    enabled: true # default = true
    symbol: "　" # default = "　"
properties:
  a: 64
  background:
    type:
      # ↓ options index
      value: 0
      options:
        - 
          animation: true
          speed:
            value: 0.15
            params:
              min: 0
              max: 1
        - 
          color: "#eb34de" # supports rgb,rgba,hsl,hsla,hex
    text: hello world!
    box:
      box:
        box:
          box:
            pen: true
          box2:
            money: 995343
localization:
  # ↓ everything in this will be added to all languages
  global:
    a: global
  local:
    en-us:
    # ↑ language culture name in lowercase
    # https://gist.github.com/maximelianenko/18c1795848ecb73aec9d53123900a170
      background:
        self: 📁 background
        type:
          self: type
          options:
            - 
              self: gradient
              animation: animation
              speed: speed
            - 
              self: solid color
              color: color
        text: text
        box:
          self: 📦box
          box:
            self: 📦box
            box:
              self: 📦box
              box:
                self: 📦box
                pen: pen
              box2:
                self: 📦box
                money: 💵moneh
    ru-ru:
      background:
        self: 📁 фон
        type:
          self: тип
          options:
            - 
              self: градиент
              animation: анимация
              speed: скорость
            - 
              self: сплошной цвет
              color: цвет
        text: текст
        box:
          self: 📦коробка
          box:
            self: 📦коробка
            box:
              self: 📦коробка
              box:
                self: 📦коробка
                pen: ручка
              box2:
                self: 📦коробка
                money: 💵деньги
    empty:
`

const template = parse(template_)
const {project,properties} = weh.project.we(template)
console.log(weh.preview(properties,"en-us"))
// console.log(properties_preview)
// console.log(WEH.prototype.preview(properties))

export default weh
