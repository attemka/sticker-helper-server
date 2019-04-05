import { version } from "../../package.json";
import { Router } from "express";
import facets from "./facets";
import { getPathByStickerId, getStickersWithFilepaths } from "../db";

export default ({ config, db }) => {
  let api = Router();

  // mount the facets resource
  api.use("/facets", facets({ config, db }));

  // perhaps expose some API metadata at the root
  api.get("/", (req, res) => {
    res.json({ version });
  });

  api.get("/stickers", (req, res) => {
    getStickersWithFilepaths(0, 20).then(stickers => {
      stickers = stickers.map(sticker => ({...sticker, filePath: `http://localhost:8888/api${sticker.filePath}`}));
      res.send(stickers);
    });
  });

  api.get("/data/stickers/:stickerId", (req, res) => {
    // const filePath = getPathByStickerId(req.params.stickerId);
    res.sendFile(`/data/stickers/${req.params.stickerId}`);
  });


  return api;
};
