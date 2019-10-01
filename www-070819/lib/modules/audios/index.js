module.exports = {
  extend: "apostrophe-pieces",
  name: "audio",
  label: "Audio",
  alias: "audios",
  perPage: 20,
  manageViews: ["list"],
  insertViaUpload: true,
  privateUpload: true,
  // Means not included in public sitewide search. -Tom
  searchable: false,
  beforeConstruct: function(self, options) {
    options.addFields = [
      {
        type: "slug",
        name: "slug",
        label: "Slug",
        prefix: "audio",
        required: true
      },
      {
        type: "private-attachment",
        name: "attachment",
        label: "Audio File",
        fileGroup: "audio",
        required: true
      },
      {
        name: "orderWeight",
        label: "Order Weight",
        type: "integer"
      }
    ].concat(options.addFields || []);
    options.arrangeFields = [
      {
        name: "basics",
        label: "Basics",
        fields: [
          "title",
          "orderWeight",
          "attachment",
          "slug",
          "published",
          "tags"
        ]
      }
    ].concat(options.arrangeFields || []);
  }
};
