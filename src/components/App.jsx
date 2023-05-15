import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';

const API_KEY = '33991160-081e616815ce3868e88aa394f';
const URL = 'https://pixabay.com/api/';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    query: '',
    pictures: [],
    page: 1,
    error: null,
    totalImages: 0,
    status: Status.IDLE,
  };

  fetchImg = () => {
    return fetch(
      `${URL}?q=${this.state.query}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        // Обробка помилки 404
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('Failed to find any images'));
      })
      .then(pictures => {
        // console.log(pictures);
        if (!pictures.total) {
          toast.error(
            `Sorry!!! Nothing was found for query: "${this.state.query}"`
          );
        }
        const selectedProperties = pictures.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => {
            return { id, webformatURL, largeImageURL, tags };
          }
        );
        // console.log(selectedProperties);
        this.setState(prevState => {
          return {
            pictures: [...prevState.pictures, ...selectedProperties],
            status: 'resolved',
            totalImages: pictures.total,
          };
        });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      this.setState({ status: 'pending', pictures: [], page: 1 });
      this.fetchImg();
    }
    if (
      this.state.query === prevState.query &&
      this.state.page !== prevState.page
    ) {
      this.setState({ status: 'pending' });
      this.fetchImg();
    }
  }

  handleFormSubmit = query => {
    // console.log(query);
    this.setState({ query });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { pictures, status, totalImages } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <section>
          {pictures.length > 0 && <ImageGallery images={pictures} />}
          {totalImages > pictures.length && (
            <Button onClick={this.handleLoadMore} />
          )}
        </section>

        {status === 'pending' && <Loader />}
        <ToastContainer autoClose={2500} />
      </>
    );
  }
}
