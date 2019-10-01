module.exports = {
  extend: "apostrophe-widgets",
  label: "Page link button",
  addFields: [
    {
      name: "url",
      type: "url",
      label: "URL",
      required: true
    },
    {
      name: "label",
      type: "string",
      label: "Label",
      required: true
  	},
	{
	  name: "position",
	  type: "select",
	  label: "Button alignment",
	  def: "left",
	  choices: [
		{
		  label: "Left",
		  value: "left"
		},
		{
		  label: "Center",
		  value: "center"
	  	},
		{
		  label: "Right",
		  value: "right"
		}
	  ],
	  required: true
	},
  ]
};
