import React, { Component } from "react";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class SearchBooks extends Component {
  state = {
    query: "",
    searchedBooks: [],
  };

  handleSearch = (query) => {
    this.setState({
      query: query,
    });

    if (query) {
      BooksAPI.search(query).then((result) => {
        if (!result.error) {
          let books = result.map((book) => {
            let displayBook = this.props.books.filter(
              (b) => b.id === book.id
            )[0];
            if (displayBook) {
              book.shelf = displayBook.shelf;
            } else {
              book.shelf = "none";
            }
            return book;
          });
          this.setState({
            searchedBooks: books,
          });
        } else {
          this.setState({
            searchedBooks: [],
          });
        }
      });
    } else {
      this.setState({
        searchedBooks: [],
      });
    }
  };

  shelfChange = (book, shelf) => {
    this.props.shelfChange(book, shelf);
  };

  render() {
    const { query, searchedBooks } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.handleSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchedBooks.length > 0 ? (
              searchedBooks.map((book) => (
                <li key={book.id}>
                  <Book book={book} shelfChange={this.shelfChange} />
                </li>
              ))
            ) : query.length !== 0 ? (
              <p>No Books Available</p>
            ) : (
                <p>No Query</p>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

SearchBooks.PropTypes = {
  books: PropTypes.array,
  shelfChange: PropTypes.func,
};

export default SearchBooks;
