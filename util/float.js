import {int} from "./index.js"

const into = (value) => {
  const num = Number.parseFloat(value)
  if (isNaN(num)) {
    throw new Error("NaN after float convertion")
  }
  return num
}

const parts = (value) => {
  const float = value.toString().split(".")
  if (float.length < 2) {
    throw new Error("passed value is not float")
  }
  const integer_ = float[0]
  const fraction_ = float[1]

  const integer = int.into(integer_)
  const fraction = int.into(fraction_)

  const precision = fraction_.length
  return {integer_,integer,fraction_,fraction,precision}
}

export {into,parts}