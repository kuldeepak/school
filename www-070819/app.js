var path = require("path");
var nodemailerSendgrid = require("nodemailer-sendgrid");

var apos = require("apostrophe")({
  shortName: "ddmix-schools",

  // See lib/modules for basic project-level configuration of our modules
  // responsible for serving static assets, managing page templates and
  // configuring user acounts.

  modules: {
    // Apostrophe module configuration

    // Note: most configuration occurs in the respective
    // modules' directories. See lib/apostrophe-assets/index.js for an example.

    // However any modules that are not present by default in Apostrophe must at
    // least have a minimal configuration here: `moduleName: {}`

    // If a template is not found somewhere else, serve it from the top-level
    // `views/` folder of the project

    // creates submenu in admin bar
    "apostrophe-admin-bar": {
      groups: [
        {
          label: "Resources",
          items: ["audios", "videos", "documents"]
        }
      ]
    },
    "apostrophe-templates": {
      viewsFolderFallback: path.join(__dirname, "views")
    },
    videos: {},
    documents: {},
    audios: {},
    profiles: {},
    "apostrophe-email": {
      // See the nodemailer documentation, many
      // different transports are available, this one
      // matches how PHP does it on Linux servers
      nodemailer: nodemailerSendgrid({
        apiKey:
          process.env.SENGRID ||
          "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"
      })
    },
    "apostrophe-login": {
      passwordReset: true,
      // The default: you have 48 hours to use a password reset link,
      // once it is sent to you
      passwordResetHours: 48,
      email: {
        from: "password-reset@example.com"
      }
    },
    "apostrophe-express": {
      csrf: {
        exceptions: ["/private/uploads", "/modules/documents/insert-via-upload"]
      }
    },
    "apostrophe-pages": {
      filters: {
        // Grab our ancestor pages, with two levels of subpages
        ancestors: {
          children: {
            depth: 2
          }
        },
        // We usually want children of the current page, too
        children: true
      }
      // other apostrophe-pages options like `types` ...
    },
    "dd-column-block-widgets": {},
    "dd-header-widgets": {},
    "dd-quoteblock-widgets": {},
    "dd-container-widgets": {},
    "dd-button-widgets": {},
    "dd-spacer-widgets": {},
    "banner-widgets": {},
    "dd-packages": {},
    "dd-packages-widgets": {},
    "dd-faq-widgets": {},
    "contact-form": {},
    "contact-form-widgets": {},
    "benefits-widgets": {},
    "google-maps-widgets": {},
    "video-popup-widgets": {},
    "apostrophe-blog": {},
    "apostrophe-blog-pages": {},
    "apostrophe-blog-widgets": {},
    "private-attachment": {},
    "color-picker": {},

    "apostrophe-rich-text": {}
  }
});
