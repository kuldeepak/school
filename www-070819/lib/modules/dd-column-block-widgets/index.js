module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Columns',
  contextualOnly: false,
  addFields: [
    {
      type: 'area',
      name: 'col0',
      label: 'First',
      contextual: true,
    },
    {
      type: 'area',
      name: 'col1',
      label: 'Second',
      contextual: true,
  	},
    {
      type: 'area',
      name: 'col2',
      label: 'Third',
      contextual: true,
    },
    {
      type: 'area',
      name: 'col3',
      label: 'Fourth',
      contextual: true,
  	},
	{
	  name: "length",
	  type: "select",
	  label: "Number of columns",
	  def: "2",
	  choices: [
		{
		  label: "2",
		  value: "2",
		  showFields: [ 'unevenColumns' ]
		},
		{
		  label: "3",
		  value: "3"
	  	},
		{
		  label: "4",
		  value: "4"
	  	}
	  ],
	  required: true
	},
	{
		name: 'unevenColumns',
      	type: 'boolean',
      	label: 'Make columns uneven?',
		def: false
    },
	{
	  name: "position",
	  type: "select",
	  label: "Vertical alignment",
	  def: "top",
	  choices: [
		{
		  label: "Top",
		  value: "top"
		},
		{
		  label: "Middle",
		  value: "middle"
	  	}
	  ],
	  required: true
	},
  ]
};
