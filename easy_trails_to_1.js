let number = 120
let steps = 0

for (; ;) {
    if (number === 1) {
        break
    }

    if (number % 2 === 0) {
        number /= 2
    } else {
        number = number * 3 + 1
    }
    steps += 1
}

console.log(steps)