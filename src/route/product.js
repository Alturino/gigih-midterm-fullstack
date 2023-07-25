/* eslint-disable import/extensions */
import express from 'express';
import { validationResult } from 'express-validator';
import {
  ProductModel,
  productCreationValidatorSchema,
  productDeletionValidatorSchema,
  productQueryValidatorSchema,
} from '../model/product.js';

const productRouter = express.Router();
const productEndpoint = '/products';

productRouter.get(productEndpoint, productQueryValidatorSchema, async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.err(result.array());
    res.status(403).send(result.array()).end();
    return;
  }
  const { videoId } = req.query;

  try {
    const products = await ProductModel.find({ videoId }).exec();
    if (products.length <= 0) {
      res.status(404).send(`Product with videoId: ${videoId} is not found`).end();
      console.error(`Product with videoId: ${videoId} is not found`);
      return;
    }
    res.status(200).json(products).end();
  } catch (e) {
    console.error(e);
    res.status(500).send(`Products could not be retrieved from database with error: ${e}`).end();
  }
});

productRouter.post(productEndpoint, productCreationValidatorSchema, async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.err(result.array());
    res.status(403).send(result.array()).end();
    return;
  }

  const { videoId, linkProduct, title, price } = req.body;
  try {
    const newProduct = await ProductModel.create({ videoId, linkProduct, title, price });
    res.status(201).send(`Product saved with data ${newProduct}`).end();
    console.log(`Product saved with data ${newProduct}`);
  } catch (error) {
    console.error(error);
    res.status(403).send(error).end();
  }
});

productRouter.put(productEndpoint, productCreationValidatorSchema, async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.err(result.array());
    res.status(403).send(result.array()).end();
    return;
  }

  const { productId, videoId, linkProduct, title, price } = req.body;
  try {
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: productId },
      { videoId, linkProduct, title, price },
      { new: true, upsert: true },
    );
    res.status(200).send(`Product updated with data ${updatedProduct}`).end();
  } catch (e) {
    console.error(e);
    res.status(500).send(`Product could not be updated with error: ${e}`).end();
  }
});

productRouter.delete(productEndpoint, productDeletionValidatorSchema, async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.err(result.array());
    res.status(403).send(result.array()).end();
    return;
  }

  const { productId } = req.body;

  try {
    await ProductModel.findByIdAndDelete({ _id: productId });
    res.status(200).send(`Product deletion is successful with id: ${productId}`).end();
  } catch (e) {
    console.error(e);
    res.status(500).send(`Product deletion is failed with error: ${e}`).end();
  }
});

export default productRouter;
