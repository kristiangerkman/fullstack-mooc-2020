import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import SingleBlog from "./SingleBlog";

describe("render single blog component", () => {
  const user = {
    userId: 123,
  };
  const blog = {
    user: { id: 123 },
    title: "title",
    author: "author",
    url: "url",
    likes: 0,
  };

  test("before click", () => {
    const component = render(<SingleBlog blog={blog} user={user} />);

    expect(component.container).toHaveTextContent("title by author");
  });
  test("after click", () => {
    const component = render(<SingleBlog blog={blog} user={user} />);

    const div = component.container.querySelector(".togglableVisibility");
    expect(div).toHaveStyle("display: none");

    expect(component.container).toHaveTextContent("Likes 0");
    const button = component.getByText("Show");
    fireEvent.click(button);

    expect(div).not.toHaveStyle("display: none");
  });
  test("click like 2 times", () => {
    const mockHandler = jest.fn();
    const component = render(
      <SingleBlog blog={blog} user={user} likePost={mockHandler} />
    );

    const button = component.getByText("Show");
    fireEvent.click(button);
    const likeButton = component.getByText("Like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
