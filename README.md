# Gigih Midterm Fullstack

Gigih Midterm Fullstack is a project built to complete the Midterm task from gigih, it is a clone from [tokopedia play](https://www.tokopedia.com/play/channels) (Backend Only)

## Database Structure

### Video Schema

```javascript
// You can find this code in ./src/model/video.js
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
```

### Comment Schema

```javascript
// You can find this code in ./src/model/comment.js
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
```

### Product Schema

```javascript
// You can find this code in ./src/model/product.js
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
```

## API Structure

### Videos

- `GET /videos` : get all videos
  - request body : `{}`
  - response body :
  ```json
  [
    {
      "urlImage": "String",
      "thumbnail": "String",
      "title": "String",
      "comments": [
        {
          "videoId": "String",
          "username": "String",
          "comment": "String"
        }
      ],
      "products": [
        {
          "videoId": "String",
          "linkProduct": "String",
          "title": "Number",
          "price": "Number"
        }
      ]
    }
  ]
  ```
- `POST /videos` : Input video

  - request body : `{videoId, urlImage, thumbnail, title}`
  - response body :

  ```json

  ```

## Installation

This project is deployed using docker so I assume that docker is installed on your device to install and run this app follow this bash command

```bash
docker compose up
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
