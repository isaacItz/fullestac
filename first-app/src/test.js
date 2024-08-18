console.log("vamos");

const arr = [1,2,3,4,5]

const result =  [1,2,3,4,5]
result.push(1)
result.concat(33) //this returns new array instead of modifying the original

console.log(result)

result.forEach(function (value) {
    console.log(value)
})

// como generar nuevos arrays con map

result.map(function (value) {
    return value * 2
})

// destructuracion 

const arr2 = [1,2,3,4,5]

const [primero, segundo, ...resto] = arr2
console.log(primero, segundo, resto)

// esa es la destructuracion, tambien se puede usar en objetos

//objetos literales

const obj = {
    name: 'bob',
    age: 20,
    city: 'London', 
    bye: function () {
        console.log('Adiós!')
    },
    doAddition: function(a, b) {    console.log(a + b)  },
}
// les podemos agregar propiedades despues de declararlos
obj.email = 'bob@example.com'
obj['que pasa '] = 'nada'

console.log(obj)

const square = x => x*x
console.log(square(4))

obj.greet = function () {
    console.log(`Hola, mi nombre es ${this.name}`)
}

obj.bye()
obj.greet()

const saludar = obj.greet.bind(obj)
saludar()

setTimeout(obj.greet.bind(obj),  1000)

// classes

class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  greet() {
    console.log('hello, my name is ' + this.name)
  }
}

const adam = new Person('Adam Ondra', 29)
adam.greet()

const janja = new Person('Janja Garnbret', 23)
janja.greet()

