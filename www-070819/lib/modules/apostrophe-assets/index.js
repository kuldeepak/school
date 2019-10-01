// This configures the apostrophe-assets module to push a 'site.less'
// stylesheet by default:

module.exports = {
  stylesheets: [
    {
      name: "site"
    },
    {
      name: "modal-video.min"
  	},
	{
      name: "toastr.min"
    }
  ],
  scripts: [
    {
      name: "site"
    },
    {
      name: "bootstrap.min"
    },
    {
      name: "jquery-modal-video.min"
    },
    {
      name: "modal-video.min"
  	},
    {
      name: "toastr.min"
    }
  ]
};
