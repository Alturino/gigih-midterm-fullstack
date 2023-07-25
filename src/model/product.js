import mongoose from 'mongoose';
import { checkSchema } from 'express-validator';

export const productMongooseSchema = new mongoose.Schema({
  videoId: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'Video',
  },
  linkProduct: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: Number,
  },
  price: {
    required: true,
    type: Number,
  },
});

export const ProductModel = mongoose.model('Product', productMongooseSchema);

export const productCreationValidatorSchema = checkSchema(
  {
    videoId: {
      notEmpty: false,
      optional: false,
      isMongoId: true,
      errorMessage: 'Invalid videoId',
    },
    linkProduct: {
      optional: false,
      isURL: true,
      errorMessage: 'linkProduct must be valid URL',
    },
    title: {
      isString: true,
      notEmpty: true,
      optional: false,
      isLength: {
        options: { min: 8 },
        errorMessage: 'Title should be at least 8 character length',
      },
    },
    price: {
      notEmpty: true,
      isNumeric: true,
      optional: false,
    },
  },
  ['body'],
);

export const productDeletionValidatorSchema = checkSchema(
  {
    productId: {
      notEmpty: {
        errorMessage: 'productId should not be empty',
      },
      optional: false,
      isMongoId: true,
      errorMessage: 'Invalid productId',
    },
  },
  ['body'],
);

export const productQueryValidatorSchema = checkSchema(
  {
    videoId: {
      isMongoId: true,
      optional: false,
      notEmpty: true,
      errorMessage: 'video',
    },
  },
  ['query'],
);
