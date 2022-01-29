let number = 1
let sum = 0

for (i = 1; i <= number / 2; i++) {
    if (number % i === 0) {
        sum += i
    }
}

if (sum === number) {
    console.log("Perfect")
} else if (sum > number) {
    console.log("Abundant")
} else {
    console.log("Deficient")
}