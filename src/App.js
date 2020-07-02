import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./BookShelf";
import SearchBooks from "./SearchBooks";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books });
      });
    });
  };

  render() {
    const { books } = this.state;
    const bookShelfs = [
      {
        title: "Current Reading",
        displayBooks: books.filter((book) => book.shelf === "currentlyReading"),
      },
      {
        title: "Want To Read",
        displayBooks: books.filter((book) => book.shelf === "wantToRead"),
      },
      {
        title: "Read",
        displayBooks: books.filter((book) => book.shelf === "read"),
      },
    ];

    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchBooks books={books} shelfChange={this.handleShelfChange} />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads: A Book Lending App</h1>
              </div>
              {bookShelfs.map((bookShelf) => (
                <BookShelf
                  key={bookShelf.title}
                  bookShelf={bookShelf}
                  shelfChange={this.handleShelfChange}
                />
              ))}
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
