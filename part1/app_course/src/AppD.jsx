import { useState } from 'react'

let test = 9

const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing the buttons
            </div>
        )
    }
    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>)
const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])
    const [totalClicks, setTotal] = useState(0)

    console.log(allClicks)
    //setAll(all.concat('L'))

    const handleLeftClick = () => {
        console.log('left before', left)
        const updatedLeft = left + 1
        setLeft(updatedLeft)
        console.log('left after', left)
        test += test
        setAll(allClicks.concat('L'))
        setTotal(updatedLeft + right)
    }

    const handleRightClick = () => {
        setRight(right + 1)
        setAll(allClicks.concat('R'))
        setTotal(totalClicks + 1)
    }

    return (
        <div>
            {left}
            <Button handleClick={handleLeftClick} text={'left'}/>
            <Button handleClick={handleRightClick} text={'rigth'}/>
            {right}
            <History allClicks={allClicks} />
            <p>test vale: {test}</p>
            <p>total clicks: {totalClicks}</p>
        </div>
    )
}

export default App