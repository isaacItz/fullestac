const Hello = (props) => {
  console.log(`componente hello ${props}`, props)
  return (
    <div>
      <p>Hello {props.name}, you are: {props.age}</p>
    </div>
  )
}
const Footer = () => {
  return (
    <div>
      greeting app created by <a href='https://github.com/mluukkai'>mluukkai</a>
    </div>
  )
}

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  const age = 3222
  const name = "roberto martinez"
  console.log(now, a+b)

  return (
    <>
      <p>Hello world, it is {now.toString()}</p>
      <br />
      <p>
        {a} plus {b} is {a + b}
      </p>

      <Hello name="bob" age={30} />
      <Hello age={age - 3200}/>
      <Hello name={name} />
      <Footer />
    </>
  )
}

export default App