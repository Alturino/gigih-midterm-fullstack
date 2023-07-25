/* eslint-disable import/extensions */
import mongoose from 'mongoose';
import { checkSchema } from 'express-validator';

const videoSchema = new mongoose.Schema({
  urlImage: {
    required: true,
    type: String,
  },
  thumbnail: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

export const VideoModel = mongoose.model('Video', videoSchema);

export const videoCreationValidatorSchema = checkSchema(
  {
    urlImage: {
      optional: false,
      notEmpty: true,
      isURL: true,
    },
    thumbnail: {
      optional: false,
      notEmpty: true,
      isURL: true,
    },
    title: {
      optional: false,
      notEmpty: true,
      isString: true,
      isLength: {
        options: { min: 8 },
      },
    },
    comments: {
      optional: true,
      isArray: true,
    },
    products: {
      optional: true,
      isArray: true,
    },
  },
  ['body'],
);

export const videoDeletionValidatorSchema = checkSchema(
  {
    videoId: {
      optional: false,
      notEmpty: true,
      isMongoId: true,
    },
  },
  ['body'],
);
