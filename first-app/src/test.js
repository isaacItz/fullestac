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
    city: 'London'
}
// les podemos agregar propiedades despues de declararlos
obj.email = 'bob@example.com'
obj['que pasa '] = 'nada'

console.log(obj)

const square = x => x*x
console.log(square(4))




