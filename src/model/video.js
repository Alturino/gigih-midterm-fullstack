import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  urlImage: {
    required: true,
    type: String,
  },
  thumbnail: {
    required: true,
    type: String,
  },
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
