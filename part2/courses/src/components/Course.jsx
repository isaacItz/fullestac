import Content from './Content'
import Header from './Header'
import SumParts from './SumParts'

const Course = ({ course }) => {

    return (
        <>
            <Header courseName={course.name}/>
            <Content parts={course.parts} />
            <SumParts parts={course.parts}/>
        </>
    )
}

export default Course