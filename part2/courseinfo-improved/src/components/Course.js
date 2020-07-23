import React from 'react';
const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }

const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => <Part part={part}/>)}
      </div>
    )
  }


const Total = ({ course }) => {
    const sum = course.parts.map(part => part.exercises)
                            .reduce((acc, cur) => acc + cur)
    return(
      <p>Number of exercises {sum}</p>
    ) 
  }

export default Course