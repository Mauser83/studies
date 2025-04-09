const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, { likes }) => {
    return sum + likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 0;

  const max = blogs.reduce((prev, current) => {
    return prev && prev.likes > current.likes ? prev : current;
  });
  return max;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return 0;

  const authors = blogs.reduce(
    (prev, curr) =>
      prev.some((item) => item.author === curr.author)
        ? prev
        : prev.concat({
            ...curr,
            blogs: blogs.filter((item) => item.author === curr.author).length,
          }),
    []
  );

  const most = authors.reduce((prev, current) => {
    return prev && prev.blogs > current.blogs ? prev : current;
  });

  const author = most;
  delete author.__v;
  delete author._id;
  delete author.likes;
  delete author.title;
  delete author.url;

  return author;
};

const mostLikes = (blogs) => {
    if (blogs.length === 0) return 0;
  
    const authors = blogs.reduce(
      (prev, curr) =>
        prev.some((item) => item.author === curr.author)
          ? prev
          : prev.concat({
              ...curr,
              likes: blogs.filter((item) => item.author === curr.author).reduce((sum, {likes}) => sum + likes, 0 )
            }),
      []
    );
  
    const most = authors.reduce((prev, current) => {
      return prev && prev.likes > current.likes ? prev : current;
    });
  
    const author = most;
    delete author.__v;
    delete author._id;
    delete author.title;
    delete author.url;
  
    return author;
  };



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
