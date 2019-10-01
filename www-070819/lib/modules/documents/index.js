module.exports = {
  extend: "apostrophe-pieces",
  name: "document",
  label: "Document",
  alias: "documents",
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
        prefix: "document",
        required: true
      },
      {
        type: "private-attachment",
        name: "attachment",
        label: "Document",
        fileGroup: "document",
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
