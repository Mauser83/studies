import { gql } from "@apollo/client";

export const modifyBooks = (client, fieldName, addedBook) => {
  client.cache.modify({
    fields: {
      [fieldName](existingBooks = []) {
        const newBookRef = client.cache.writeFragment({
          data: addedBook,
          fragment: gql`
            fragment NewBook on Book {
              id
              title
              author {
                name
              }
              published
              genres
            }
          `,
        });

        if (!existingBooks.some((book) => book.id === addedBook.id)) {
          return [...existingBooks, newBookRef];
        }

        return existingBooks;
      },
    },
    broadcastQueries: true,
  });
};

export const modifyGenres = (client, fieldName, addedGenres) => {
  client.cache.modify({
    fields: {
      [fieldName](existingGenres = []) {
        const newGenres = addedGenres.filter(
          (genre) => !existingGenres.includes(genre)
        );
        if (newGenres.length > 0) {
          return (existingGenres = existingGenres.concat(newGenres));
        }
        return existingGenres;
      },
    },
    broadcastQueries: true,
  });
};

export const modifyAuthors = (client, fieldName, addedAuthor) => {
          client.cache.modify({
            fields: {
              [fieldName](existingAuthors = []) {
                const newAuthorRef = client.cache.writeFragment({
                  data: addedAuthor,
                  fragment: gql`
                  fragment NewAuthor on Author {
                    name
                    born
                    bookCount
                    id
                  }`
                })
      
                if (!existingAuthors.some(author => author.id === addedAuthor.id)) {
                  return [...existingAuthors, newAuthorRef]
                }
      
                return existingAuthors
              }
            },
            broadcastQueries: true
          })
    
}