import React from "react";

const Blogs = ({ blogs }) => {
  return (
    <div>
      {blogs.map(b => (
        <p key={b.id}>
          {b.title} {b.author}
        </p>
      ))}
    </div>
  );
};

export default Blogs;
