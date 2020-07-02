import React, { Component } from "react";
import ListBooks from "./ListBooks";
import PropTypes from "prop-types";

class BookShelf extends Component {
  shelfChange = (book, shelf) => {
    this.props.shelfChange(book, shelf);
  };

  render() {
    const { bookShelf } = this.props;
    return (
      <div className="list-books-content">
        <div className="bookshelf">
          <h2 className="bookshelf-title">{bookShelf.title}</h2>
          <ListBooks
            displayBooks={bookShelf.displayBooks}
            shelfChange={this.shelfChange}
          />
        </div>
      </div>
    );
  }
}

BookShelf.PropTypes = {
  bookShelf: PropTypes.array,
  shelfChange: PropTypes.func,
};

export default BookShelf;
