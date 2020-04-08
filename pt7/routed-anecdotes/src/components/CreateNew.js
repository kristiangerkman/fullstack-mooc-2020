import React from "react";
import { useField } from "../hooks";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.field.value,
      author: author.field.value,
      info: info.field.value,
      votes: 0,
    });
    props.setNotification(`a new anecdote ${content.field.value} created!`);
    setTimeout(() => props.setNotification(""), 10000);
    history.push("/");
  };
  const reset = () => {
    author.reset();
    content.reset();
    info.reset();
    /* :DDDDD??????????????????
     switch (document.activeElement.id) {
      case "author":
        return author.reset;
      case "content":
        return content.reset;
      case "info":
        return info.reset;
      default:
        return;
    } */
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} autocomplete="off">
        <div>
          content
          <input id="content" {...content.field} />
        </div>
        <div>
          author
          <input id="author" {...author.field} />
        </div>
        <div>
          url for more info
          <input id="info" {...info.field} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={reset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
