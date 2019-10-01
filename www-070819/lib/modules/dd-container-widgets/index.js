module.exports = {
  extend: "apostrophe-widgets",
  label: "Container",
  contextualOnly: true,
  addFields: [
    {
      name: "content",
      type: "area",
      label: "Content",
      contextual: true
    }
  ],
  construct: function(self, options) {
    var superPushAssets = self.pushAssets;
    self.pushAssets = function() {
      superPushAssets();
      self.pushAsset("stylesheet", "styles", { when: "always" });
    };
  }
};
