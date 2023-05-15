import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import ImageGalleryItem from 'components/ImageGalleryItem';
// import Modal from 'components/Modal';
import css from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    // showModal: false,
    // bigPic: null,
  };

  

  render() {
    

    return (
      <>
        <ul className={css.imageGallery}>
          {this.props.images.map(img => {
            return (
              <ImageGalleryItem
                // key={img.id}
                // keyForLi={img.id}
                // smallImgURL={img.webformatURL}
                // descriptionImg={img.tags}
                key={nanoid()}
                smallImgURL={img.webformatURL}
                id={img.id}
              />
            );
          })}
        </ul>

       
      </>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      // tags: PropTypes.string.isRequired,
    })
  ),
};
