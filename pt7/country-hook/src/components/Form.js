import React from "react";

const Form = ({ fetch, nameInput }) => {
  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
    </div>
  );
};

export default Form;
