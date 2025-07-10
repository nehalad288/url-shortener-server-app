import mongoose, { Schema } from "mongoose";
import { nanoid } from "nanoid";

export interface ShortUrl extends mongoose.Document {
  fullUrl: string;
  shortUrl: string;
  userId: string;
  clickCount: number;
  customSlug: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const shortUrlSchema = new Schema<ShortUrl>({
    fullUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        default: ()=> nanoid().substring(0,10),
    },
    userId: {
        type: String,
        required: true
    },
    clickCount: {
        type: Number,
        default: 1
    },
    customSlug: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
});

export const shortUrlModel = mongoose.model("ShortUrl", shortUrlSchema);