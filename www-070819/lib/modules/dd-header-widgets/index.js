module.exports = {
  extend: 'apostrophe-widgets',
  label: 'DDMIX header',
  addFields: [
    {
      type: 'singleton',
      name: 'title',
      label: 'Title',
      contextual: true,
  },
  {
	name: "position",
	type: "select",
	label: "Text alignment",
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
  }
  ]
};
