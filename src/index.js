import express from 'express';
import mongoose from 'mongoose';
import Video from './model/video';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

// return {"id":"", "urlImage":"", "thumbnail": ""}
app.get('/videos', async (req, res) => {
  const videos = await Video.find({});
  res.send(videos);
});

app.post('/videos', (req, res) => {
  const { urlImage, thumbnail } = req.body;
  const newVideo = new Video({ urlImage, thumbnail });
  newVideo.save((err, video) => {
    if (err) console.error(err);
    console.log(`video saved with data ${video}`);
  });
});

// return {"id":"", "linkProduct":"", "title": "", "price": ""}
// query param videoId
app.get('/products', (req, res) => {
  const { videoId } = req.query;
});

// return {"id":"", "username":"", "comment": "", "timestamp": ""}
app.get('/comments/:videoId', (req, res) => {});

// return {"success":"", "fail":""}
// request body {"username":"", "comment":"", "videoId": ""}
app.post('/comments', (req, res) => {
  const { username, comment, videoId } = req.body;
});

app.listen(port, async () => {
  await mongoose.connect(`mongodb://127.0.0.1:27017/gigih_midterm`);

  console.log(`Server start at ${port}`);
});
