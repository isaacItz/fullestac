import { useState } from 'react'

const Display = ({ counter }) => <div>counter: {counter}</div>

const Button = ({onClick, text}) => <button onClick={onClick}> {text}</button>

const App = () => {
    const [counter, setCounter] = useState(0)
    console.log('inicio del component: ', counter)
    //setTimeout(() => setCounter(counter + 1), 1000)
    const increaseByOne = () => setCounter(counter + 1)
    const decreaseByOne = () => setCounter(counter - 1)
    const setToZero = () => setCounter(0)

    return (
        <div>
            <Display counter={counter}></Display>
            <Button onClick={increaseByOne} text={'increase'}></Button>
            <Button onClick={decreaseByOne} text={'decrease'}></Button>
            <Button onClick={setToZero} text='reset'></Button>
        </div>
    )
}

export default App