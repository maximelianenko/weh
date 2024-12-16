const into = (value) => {
	const num = Number.parseInt(value)
	if (isNaN(num)) {
		throw new Error("NaN after int convertion")
	}
	return num
}

export {into}