module.exports = {
  extend: "apostrophe-widgets",
  label: "Benefits",
  addFields: [
    {
      name: "image",
      type: "attachment",
      label: "Image",
      required: true
    },
    {
      name: "message",
      type: "string",
      label: "message",
      required: true
    }
  ],
  construct: function(self, options) {
    var superPushAssets = self.pushAssets;
    self.pushAssets = function() {
      superPushAssets();
      self.pushAsset("stylesheet", "benefits", { when: "always" });
    };
  }
};
