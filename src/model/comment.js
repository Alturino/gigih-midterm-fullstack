import { checkSchema } from 'express-validator';
import mongoose from 'mongoose';

export const commentSchema = new mongoose.Schema(
  {
    videoId: {
      required: true,
      type: mongoose.Types.ObjectId,
      ref: 'Video',
    },
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

export const commentCreationValidatorSchema = checkSchema(
  {
    videoId: {
      optional: false,
      notEmpty: {
        errorMessage: 'videoId should not be empty',
      },
      isMongoId: true,
    },
    username: {
      optional: false,
      isString: {
        errorMessage: 'username should be string',
      },
      isLength: {
        errorMessage: 'username should be at least 8 character length',
        options: { min: 8 },
      },
    },
    comment: {
      optional: false,
      notEmpty: {
        errorMessage: 'comment must not empty',
      },
      isString: {
        errorMessage: 'comment should be string',
      },
      isLength: {
        errorMessage: 'comment should be at least 8 character length',
        options: { min: 8 },
      },
    },
  },
  ['body'],
);

export const commentDeletionValidatorSchema = checkSchema(
  {
    videoId: {
      optional: true,
      isMongoId: true,
    },
  },
  ['query'],
);
