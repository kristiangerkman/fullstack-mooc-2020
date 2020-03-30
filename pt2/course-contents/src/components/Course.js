import React from "react";
import Content from "./Content";

const Course = ({ course }) => {
  const total = course.parts.reduce((s, p) => {
    let a = 0;
    console.log(isNaN(s));
    if (isNaN(s)) {
      a = s.exercises;
      console.log(s, a);
      return a + p.exercises;
    } else {
      return s + p.exercises;
    }
  });
  console.log(total);
  return (
    <div>
      <h3>{course.name}</h3>
      <Content parts={course.parts} />
      <b>
        <p>Total of {total} exercises</p>
      </b>
    </div>
  );
};

export default Course;
