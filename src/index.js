/* eslint-disable import/extensions */
import express from 'express';
import mongoose from 'mongoose';
import productRouter from './route/product.js';
import videoRouter from './route/video.js';
import commentRouter from './route/comment.js';

const app = express();
const port = 3000;
const dbname = 'gigih_midterm';

app.use(productRouter);
app.use(videoRouter);
app.use(commentRouter);

app.listen(port, async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/${dbname}`);
    console.log(`Server start at ${port}`);
  } catch (e) {
    console.error(e);
  }
});
