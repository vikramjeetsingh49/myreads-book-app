import React, { Component } from "react";
import Book from "./Book";
import PropTypes from "prop-types";

class ListBooks extends Component {
  shelfChange = (book, shelf) => {
    this.props.shelfChange(book, shelf);
  };

  render() {
    const { displayBooks } = this.props;
    return (
      <div>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {displayBooks.map((book) => (
              <li key={book.id}>
                <Book book={book} shelfChange={this.shelfChange} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

ListBooks.PropTypes = {
  displayBooks: PropTypes.Array,
  shelfChange: PropTypes.func,
};

export default ListBooks;
