/* eslint-disable import/extensions */
import express from 'express';
import mongoose from 'mongoose';
import productRouter from './route/product.js';
import videoRouter from './route/video.js';
import commentRouter from './route/comment.js';
import DB_URI from './config/dbconfig.js';

const app = express();
const port = 3000;

app.use(productRouter);
app.use(videoRouter);
app.use(commentRouter);

app.listen(port, async () => {
  try {
    console.log(DB_URI);
    await mongoose.connect(DB_URI);
    console.log(`Server start at ${port}`);
  } catch (e) {
    console.error(e);
    console.error(DB_URI);
  }
});
