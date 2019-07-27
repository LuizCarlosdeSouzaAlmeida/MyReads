import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import Search from './Search';
import ShelfChanger from './ShelfChanger'

class BooksApp extends React.Component {
  state = {
      books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => { this.setState({ books }); });
  };

  moveBookShelf = (book, shelf) => {

      book.props.book.shelf = shelf;

      this.setState( (state) => ({
          books: state.books
	  .filter( (b) => b.id !== book.props.book.id)
	  .concat([book.props.book])
      }))

      BooksAPI.update(book.props.book, shelf);

  };


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <ShelfChanger
                books={this.state.books}
                onBookShelfChange={this.moveBookShelf}
              />
              <div className="open-search">
                <Link
                  to="/search"
                >Add a book</Link>
              </div>
            </div>
        )}
        />

        <Route path="/search" render={() => (
            <Search
                bsBooks={this.state.books}
                onBookShelfChange={this.moveBookShelf}
            />
        )}

        />

      </div>
    )
  }
}

export default BooksApp
