const x = 1
let y = 5

console.log(x, y)   // 1, 5 are printed
y += 10
console.log(x, y)   // 1, 15 are printed
y = 'sometext'
console.log(x, y)   // 1, sometext are printed

const t = [1, -1, 3]

t.push(5)

console.log(t.length) // 4 is printed
console.log(t[1])     // -1 is printed


// forEach calls the function for each of the items in the array

t.forEach(value => {
  console.log(value)  // numbers 1, -1, 3, 5 are printed, each to own line
})             

// One characteristic of the functional programming paradigm is the use of 
// immutable data structures. In React code, it is preferable to use the method concat,
// which does not add the item to the array,
// but creates a new array in which the content of the old array
// and the new item are both included.

const t = [1, -1, 3]

const t2 = t.concat(5)

console.log(t)  // [1, -1, 3] is printed
console.log(t2) // [1, -1, 3, 5] is printed


// map() creates a new array 
const t = [1, 2, 3]

const m1 = t.map(value => value * 2)
console.log(m1)   // [2, 4, 6] is printed

// destruct assignment 

const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t

console.log(first, second)  // 1, 2 is printed
console.log(rest)          // [3, 4 ,5] is printed

// Object literals

const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
  }

  // adding on the fly 

  object1.address = 'Helsinki'
  object1['secret number'] = 12341

  // functions

  const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
  }

  const square = p => {
    console.log(p)
    return p * p
  }

  const square = p => p * p