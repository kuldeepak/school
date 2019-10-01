const fs = require("fs");
var _ = require("@sailshq/lodash");
var uploadfs = require("uploadfs");
module.exports = {
  //improve: "apostrophe-attachments",
  //name: "lc-attachments",
  //extend: "apostrophe-attachments",
  construct: (self, options) => {
    self.fileGroups = [
      {
        name: "images",
        label: "Images",
        extensions: ["gif", "jpg", "png"],
        extensionMaps: {
          jpeg: "jpg"
        },
        // uploadfs should treat this as an image and create scaled versions
        image: true
      },
      {
        name: "audio",
        label: "Audio",
        extensions: ["mp3"],
        extensionMaps: {},
        // uploadfs should treat this as an image and create scaled versions
        image: false
      },
      {
        name: "document",
        label: "Document",
        extensions: ["pdf", "doc"],
        extensionMaps: {},
        // uploadfs should treat this as an image and create scaled versions
        image: false
      }
    ];
    self.apos.app.get("/private/uploads/attachments/:id", async (req, res) => {
      if (req.user) {
        const id = req.params.id;
        const mime = require("mime");
        const type = mime.getType(`./private/uploads/attachments/${id}`);
        const data = fs.readFileSync(`./private/uploads/attachments/${id}`);
        res.contentType(type);
        res.send(data);
      } else {
        return req.res.redirect("/404");
      }
    });
  }
};
