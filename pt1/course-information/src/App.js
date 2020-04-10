import React from "react";

const Header = ({ name }) => <h1>{name}</h1>;

const Part = ({ title, exercises }) => (
  <p>
    {title} {exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((p) => (
        <Part title={p.title} exercises={p.exercises} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        title: "Fundamentals of React",
        exercises: 10,
      },
      { title: "Using props to pass data", exercises: 7 },
      { title: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      {/*       <p>
        Number of exercises{" "}
        {courses.course1.parts.part1.exercises +
          courses.course1.parts.part2.exercises +
          courses.course1.parts.part3.exercises}
      </p> */}
    </div>
  );
};

export default App;
