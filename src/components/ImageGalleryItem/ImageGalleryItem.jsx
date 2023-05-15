import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  render() {
    return (
      // <li className={css.imageGalleryItem} key={this.props.keyForLi}>
      //   <img src={this.props.smallImgURL} alt={this.props.descriptionImg} />
      // </li>

      <li className={css.imageGalleryItem}>
        <img src={this.props.smallImgURL} alt={this.props.id} />
      </li>
    );
  }
}

// const ImageGalleryItem = ({ keyForLi, smallImgURL, descriptionImg }) => (
//   <li className={css.imageGalleryItem} key={keyForLi}>
//     <img src={smallImgURL} alt={descriptionImg} />
//   </li>
// );

ImageGalleryItem.propTypes = {
  // keyForLi: PropTypes.number.isRequired,
  // smallImgURL: PropTypes.string.isRequired,
  // descriptionImg: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  smallImgURL: PropTypes.string.isRequired,
};

// export default ImageGalleryItem;
