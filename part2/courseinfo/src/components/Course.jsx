const Header = ({ courseName }) => <h1>{courseName}</h1>

const Part = ({ name, exercises}) => { 
  return (
    <p>{name} {exercises}</p>
  )
  }


const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return (
        <Part name={part.name} exercises={part.exercises} key={part.id}/>
        )
      })}
    </>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((total, part) => 
  {
    return total + part.exercises
  }, 0)
  return (
    <em>total of {total} exercises</em>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header courseName={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </>
  )

}

export default Course