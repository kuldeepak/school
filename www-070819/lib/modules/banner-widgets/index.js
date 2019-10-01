module.exports = {
  extend: "apostrophe-widgets",
  label: "Banner",
  addFields: [
    {
      name: "imageUrl",
      type: "attachment",
      label: "Background image",
      required: true
    },
    {
      name: "content",
      type: "area",
      label: "Content",
      contextual: true
  },
    {
      name: "preventScrolling",
      type: "boolean",
      label: "Prevent image scrolling with page"
  },
  {
	name: "position",
	type: "select",
	label: "Image position",
	def: "center",
	choices: [
	  {
		label: "Center",
		value: "center",
		// showFields: [ 'unevenColumns' ]
	  },
	  {
		label: "Left",
		value: "left"
	  },
	  {
		label: "Right",
		value: "right"
	  }
	],
	required: true
  },
  ],
  construct: function(self, options) {
    var superPushAssets = self.pushAssets;
    self.pushAssets = function() {
      superPushAssets();
      self.pushAsset("stylesheet", "styles", { when: "always" });
    };
  }
};
