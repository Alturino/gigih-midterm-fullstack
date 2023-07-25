import { checkSchema } from 'express-validator';
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    username: {
      required: true,
      type: String,
    },
    comment: {
      required: true,
      type: String,
    },
  },
  { timestamps: true },
);

export const CommentModel = mongoose.model('Comment', commentSchema);

export const commentBodyValidatorSchema = checkSchema(
  {
    videoId: {
      isMongoId: true,
    },
    username: {
      isString: true,
      isLength: {
        errorMessage: 'Username should be at least 8 character length',
        options: { min: 8 },
      },
    },
    comment: {
      isString: true,
      isLength: {
        errorMessage: 'Username should be at least 8 character length',
        options: { min: 8 },
      },
    },
  },
  ['body'],
);

export const commentQueryValidatorSchema = checkSchema(
  {
    videoId: {
      optional: true,
      isMongoId: true,
    },
  },
  ['query'],
);
