module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Quote block',
  addFields: [
    {
	  name: 'quote',
	  type: 'singleton',
	  label: "Quote",
      widgetType: 'apostrophe-rich-text',
  	},
    {
	  name: 'name',
	  type: 'string',
	  label: "Name",
  	},
    {
	  name: 'relation',
	  type: 'string',
	  label: "Relation",
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
