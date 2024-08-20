import Part from './Part'

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part => <Part key={part.id} exercises={part.exercises} name={part.name} />)}
        </>
    )
}

export default Content