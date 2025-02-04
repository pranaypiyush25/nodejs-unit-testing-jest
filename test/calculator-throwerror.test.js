const { add, subtract, multiply } = require('../src/calculator-throwerror');

test('Addition: Throw Error when inputs are not numbers', async () => {
    expect(() => add('5', 5)).toThrowError(
        Error('Inputs should be numbers')
    )
})

test('Additing two numbers', async () => {
    expect(add(5, 5)).toStrictEqual(10)
})


test('Subtraction: Throw Error when inputs are not numbers', async () => {
    expect(() => subtract('5', 5)).toThrowError(
        Error('Inputs should be numbers')
    )
})

test('Subtracting two numbers', async () => {
    expect(subtract(5, 5)).toStrictEqual(0)
})

test('Multiplication: Throw Error when inputs are not numbers', async () => {
    expect(() => multiply('5', 5)).toThrowError(
        Error('Inputs should be numbers')
    )
})

test('Multiplying two numbers', async () => {
    expect(multiply(10, 10)).toStrictEqual(100)
    expect(multiply(200, 100)).toStrictEqual(20000)
})