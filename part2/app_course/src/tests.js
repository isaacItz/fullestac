// al usar una promesa revuelta, el bloque 'then' se lanzará automáticamente,
// pero sus funciones controladoras se lanzarán asíncronamente,
// como demuestran los console.logs
var promResuelta = Promise.resolve(33);

console.log(promResuelta)

var thenProm = promResuelta.then((valor) => {
  console.log("ésto será invocado cuando acabe el stack principal. El valor recibido y devuelto es: " + valor);
  return valor;
});
// imprimimos al momento el valor de thenProm()
thenProm.then( val => {console.log(`que pasa ${val}`)}).then ((da) => {console.log("la ultima promesa")})
console.log(thenProm.then(val => console.log(val)));

// usando setTimeout podemos posponer la ejecución de una función al momento en el que el stack quede vacío.
setTimeout(function(){
  console.log(thenProm);
});


// logs, en orden:
// Promise {[[EstadoPromise¡]]: "pendiente", [[ValorPromise]]: undefined}
// "ésto será invocado cuando acabe el stack principal. El valor recibido y devuelto es: "33"
// Promise {[[EstadoPromise]]: "resuelta", [[ValorPromise]]: 33}

