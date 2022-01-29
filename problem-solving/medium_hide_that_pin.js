var number = 30

// numberBinary will store binary of number in string
var numberBinary = number.toString(2)


var result = []

// digitPlace will track digits position
var digitPlace = 1

for (i = numberBinary.length - 1; i >= 0; i--) {
    if (numberBinary[i] == 1) {
        if (digitPlace === 1) {
            result.push("pop")
        } else if (digitPlace === 2) {
            result.push("double rip")
        } else if (digitPlace === 3) {
            result.push("hide your mints")
        } else if (digitPlace === 4) {
            result.push("fall")
        } else {
            result.reverse()
        }
    }
    digitPlace += 1
}

console.log(result)