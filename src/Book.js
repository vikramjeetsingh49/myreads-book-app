import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {
  render() {
      const { book, shelfChange} = this.props
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                book.imageLinks ? book.imageLinks.thumbnail : ""
              })`,
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={book.shelf}
              onChange={(event) =>
                shelfChange(book, event.target.value)
              }
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {book.title ? book.title : ""}
        </div>
        <div className="book-authors">
          {book.authors ? book.authors.join(", ") : ""}
        </div>
      </div>
    );
  }
}

Book.PropTypes = {
  book: PropTypes.object,
  shelfChange: PropTypes.func,
};

export default Book;
