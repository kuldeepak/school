module.exports = {
  extend: "apostrophe-widgets",
  label: "Video Popup",
  addFields: [
    {
      name: "video_id",
      type: "string",
      label: "Video Id",
      required: true
  	},
	{
      name: "caption",
      type: "string",
      label: "Button caption (underneath)"
  	},
  ],
  construct: function(self, options) {
    var superPushAssets = self.pushAssets;
    self.pushAssets = function() {
      superPushAssets();
      self.pushAsset("script", "always", { when: "always" });
      self.pushAsset("stylesheet", "always", { when: "always" });
    };
  }
};
