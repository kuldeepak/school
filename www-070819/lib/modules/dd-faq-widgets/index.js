module.exports = {
  extend: "apostrophe-widgets",
  label: "FAQ Item",
  // contextualOnly: true,
  addFields: [
    {
      name: "question",
      type: "string",
      label: "Question",
      // contextual: true
  	},
	{
	  name: 'answer',
	  type: 'singleton',
	  label: "Answer",
      widgetType: 'apostrophe-rich-text',
	  contextual: true
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
