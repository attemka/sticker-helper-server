import mongoose from "mongoose";
import "./models/stickers";
import "./models/searchword";

const stickers = mongoose.model("Stickers");
const searchwords = mongoose.model("Searchword");

export default callback => {
  mongoose.connect("mongodb://127.0.0.1:27017/BOT_DB");
  callback();
};

export const getPathByStickerId = id => {
  const stickers = mongoose.model("Stickers");
  const sticker = stickers.findOne({ stickerId: id });
  return sticker && sticker.filePath;
};

export const getStickerKeywords = stickerId => {
  return searchwords
    .find({ parentStickerId: stickerId })
    .then(keywords => keywords.map(keyword => keyword.text));
};

export const getStickersWithFilepaths = (page, limit) => {
  return new Promise((resolve, reject) => {
    stickers
      .find({})
      .populate("searchWords")
      .exec((err, stickers) => {
        if (err) {
          reject(err);
        }
        resolve(stickers.map(sticker => sticker.toJSON()));
      });
  });
};
