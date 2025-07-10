import express from "express";
import { shortUrlModel } from "../model/shortUrl";
import validator from "validator";

export const createUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { fullUrl, userId } = req.body;
    
    // Validate the fullUrl
    if (!validator.isURL(fullUrl, { require_protocol: true })) {
      res.status(400).send({ message: "Invalid URL format" });
    }
    // Check if the URL already exists
    const urlFound = await shortUrlModel.find({ fullUrl });

    if (urlFound.length > 0) {
      res.status(201).send(urlFound[0]);
    } else {
      const shortUrl = await shortUrlModel.create({ fullUrl, userId });
      res.status(201).send(shortUrl);
    }
  } catch (error) {
    res.status(500).send({ message: "Some error occured" });
  }
};

export const getAllUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const shortUrls = await shortUrlModel.find({ userId: id });
    if (shortUrls.length < 0) {
      res.status(404).send({ message: "Urls not found" });
    } else {
      res.status(200).send(shortUrls);
    }
  } catch (error) {
    res.status(500).send({ message: "Some error occured" });
  }
};

export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const shortUrl = await shortUrlModel.findOne({ shortUrl: id });
    console.log("shorturl:", shortUrl);
    if (!shortUrl) {
      res.status(404).send({ message: "ShortUrl not found" });
    } else {
      shortUrl.clickCount++;
      shortUrl.save();
      res.redirect(`${shortUrl.fullUrl}`);
    }
  } catch (error) {
    res.status(500).send({ message: "Some error occured" });
  }
};

export const deleteUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const shortUrl = await shortUrlModel.findByIdAndDelete({ _id: id });
    if (shortUrl) {
      res.status(200).send({ message: "Requested url is deleted" });
    }
  } catch (error) {
    res.status(500).send({ message: "Some error occured" });
  }
};
