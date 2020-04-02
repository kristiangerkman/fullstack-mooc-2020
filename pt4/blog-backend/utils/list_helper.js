const findIndex = arr => {
  let max = arr[0];
  let maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }
  return maxIndex;
};

const dummy = blogs => {
  return 1;
};

const totalLikes = list => {
  const likes = list.map(b => b.likes);
  return likes.reduce((s, p) => s + p);
};

const findFavorite = list => {
  const likes = list.map(b => b.likes);

  const favIndex = findIndex(likes);

  return {
    title: list[favIndex].title,
    author: list[favIndex].author,
    likes: list[favIndex].likes
  };
};

const mostBlogs = list => {
  const authors = list.map(b => {
    return b.author;
  });

  const filteredAuthors = [];
  authors.map(a =>
    filteredAuthors.includes(a) ? null : filteredAuthors.push(a)
  );

  const finalAuthors = filteredAuthors.map(a => {
    return { author: a, blogs: 0 };
  });
  authors.map(a =>
    finalAuthors.map(b => (b.author === a ? (b.blogs += 1) : null))
  );

  const blogs = finalAuthors.map(b => b.blogs);
  const result = finalAuthors[findIndex(blogs)];
  return result;
};

const mostLikes = list => {
  //list of all author names
  const authors = list.map(b => {
    return b.author;
  });
  //only one instance of name
  const filteredAuthors = [];
  authors.map(a =>
    filteredAuthors.includes(a) ? null : filteredAuthors.push(a)
  );
  //format author list
  const finalAuthors = filteredAuthors.map(a => {
    return { author: a, likes: 0 };
  });

  list.map(a =>
    finalAuthors.map(b => (b.author === a.author ? (b.likes += a.likes) : null))
  );

  const likes = finalAuthors.map(b => b.likes);
  const result = finalAuthors[findIndex(likes)];
  return result;
};

module.exports = {
  dummy,
  totalLikes,
  findFavorite,
  mostBlogs,
  mostLikes
};
