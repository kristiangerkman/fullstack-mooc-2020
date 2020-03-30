import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ title, exercises }) => (
  <p>
    {title} {exercises}
  </p>
);

const Content = ({ courses }) => {
  return (
    <div>
      <Part
        title={courses.course1.parts.part1.title}
        exercises={courses.course1.parts.part1.exercises}
      />
      <Part
        title={courses.course1.parts.part2.title}
        exercises={courses.course1.parts.part2.exercises}
      />
      <Part
        title={courses.course1.parts.part3.title}
        exercises={courses.course1.parts.part3.exercises}
      />
    </div>
  );
};

const App = () => {
  const courses = {
    course1: {
      title: "Half Stack application development",
      parts: {
        part1: {
          title: "Fundamentals of React",
          exercises: 10
        },
        part2: { title: "Using props to pass data", exercises: 7 },
        part3: { title: "State of a component", exercises: 14 }
      }
    }
  };
  console.log(courses);
  return (
    <div>
      <Header course={courses.course1.title} />
      <Content courses={courses} />
      <p>
        Number of exercises{" "}
        {courses.course1.parts.part1.exercises +
          courses.course1.parts.part2.exercises +
          courses.course1.parts.part3.exercises}
      </p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
