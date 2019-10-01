apos.define("video-popup-widgets", {
  extend: "apostrophe-widgets",
  construct: function(self, options) {
    $(".video-button").modalVideo({});
  }
});
