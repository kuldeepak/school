module.exports = {
  extend: "apostrophe-widgets",
  label: "Spacing",
  contextualOnly: false,
  addFields: [
	  {
  	  name: "size",
  	  type: "select",
  	  label: "Spacing size",
  	  def: "full",
  	  choices: [
  		{
  		  label: "Full",
  		  value: "full"
  		},
  		{
  		  label: "Half",
  		  value: "half"
  	  	},
  		{
  		  label: "Quarter",
  		  value: "quarter"
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
