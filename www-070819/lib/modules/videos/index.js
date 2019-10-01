module.exports = {
  extend: "apostrophe-pieces",
  name: "video",
  label: "Video",
  pluralLabel: "Videos",
  addFields: [
    {
      name: "vimeo-link",
      label: "Vimeo Link",
      type: "video",
      required: true
    },
    {
      name: "orderWeight",
      label: "Order Weight",
      type: "integer"
    }
  ],
  beforeConstruct: function(self, options) {
    options.arrangeFields = [
      {
        name: "basics",
        label: "Basics",
        fields: [
          "title",
          "orderWeight",
          "vimeo-link",
          "slug",
          "published",
          "tags"
        ]
      }
    ].concat(options.arrangeFields || []);
  }
};
