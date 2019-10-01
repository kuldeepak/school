module.exports = {
  extend: "apostrophe-widgets",
  label: "Google Maps",
  addFields: [
    {
      name: "lat",
      type: "string",
      label: "Lat",
      required: true
    },
    {
      name: "long",
      type: "string",
      label: "Long",
      required: true
    }
  ],
  construct: function(self, options) {
    var superPushAssets = self.pushAssets;
    self.pushAssets = function() {
      superPushAssets();
      self.pushAsset("script", "index", { when: "always" });
      self.pushAsset("stylesheet", "map", { when: "always" });
    };
  }
};
