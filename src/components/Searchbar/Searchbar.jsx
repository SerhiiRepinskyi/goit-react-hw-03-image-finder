import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  // Обробник для інпуту, відповідає за оновлення стану
  handleInputChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  // Викликається під час submit - пошуку
  handleSubmit = event => {
    event.preventDefault();

    // Відміняємо пошук по пустій стрічці
    if (this.state.query.trim() === '') {
      toast.error('Enter your search query!');
      return;
    }

    // Передаємо через prop значення query в state App
    this.props.onSubmit(this.state.query);
    // this.setState({ query: '' }); // -- Очистка після submit
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
