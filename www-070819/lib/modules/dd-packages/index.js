var _ = require("lodash"),
  async = require("async"),
  moment = require("moment");

module.exports = {
  extend: "apostrophe-pieces",
  name: "package",
  label: "Package",
  alias: "package",
  permissionsFields: false,
  beforeConstruct: function(self, options) {
    options.sort = { publishedAt: -1 };
    options.addFields = [
      {
        name: "pricePrefix",
        type: "string",
        label: "Price prefix"
      },
      {
        name: "buttonLink",
        type: "string",
        label: '"Read more" button override link'
      },
      {
        name: "buttonValue",
        type: "string",
        label: '"Read more" button override text'
      },
      {
        name: "contactLinkUrl",
        type: "string",
        label: 'Contact form button override link'
      },
      {
        name: "contactLinkValue",
        type: "string",
        label: 'Contact form button override text'
      },
      {
        name: "price",
        type: "float",
        label: "Package price"
      },
      {
        name: "features",
        label: "Key features",
        type: "array",
        titleField: "feature",
        schema: [
          {
            type: "string",
            name: "feature",
            label: "Feature"
          }
        ]
      },
      {
        name: "category",
        type: "select",
        label: "Category",
        def: "school",
        choices: [
          {
            label: "School",
            value: "school"
            /*showFields: [
              'accessible', 'vegetarian'
            ]*/
          },
          {
            label: "PPA",
            value: "ppa"
          }
        ],
        required: true
      },
      {
        name: "coverImg",
        type: "attachment",
        label: "Cover Image"
      },
      {
        name: "icon",
        type: "attachment",
        label: "Package icon"
      },
      {
        name: "shortDescription",
        type: "string",
        label: "Short Description"
      },
      {
        name: "description",
		type: 'singleton',
  	  	label: "Description",
        widgetType: 'apostrophe-rich-text'
      }
    ].concat(options.addFields || []);
    options.arrangeFields = _.merge(
      [
        {
          name: "basic",
          label: "Basics",
          fields: [
            "title",
            "slug",
            "tags",
            "published",
            "pricePrefix",
            "price",
            "icon",
            "coverImg",
            "shortDescription",
            "description",
            "category",
            "features"
          ]
	  	},
		{
          name: "button",
          label: "Action button overrides",
          fields: [
			  "buttonLink",
			  "buttonValue",
			  "contactLinkUrl",
			  "contactLinkValue"
		  ]
	  	}
      ],
      options.arrangeFields || []
    );
    options.addColumns = [
      {
        name: "title",
        label: "Title"
      },
      {
        name: "price",
        label: "Price"
      },
      {
        name: "category",
        label: "Category"
      }
    ];
    options.addSorts = [
      {
        name: "category",
        label: "By category",
        sort: { startDate: -1 }
      }
    ].concat(options.addSorts || []);
    options.addFilters = [
      {
        name: "category",
        choices: [
          {
            value: true,
            label: "School"
          },
          {
            value: false,
            label: "PPA"
          },
          {
            value: null,
            label: "All"
          }
        ],
        def: null
      }
    ].concat(options.addFilters || []);
  }
};
