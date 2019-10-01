// This configures the apostrophe-pages module to add a "home" page type to the
// pages menu

module.exports = {
  types: [
    {
      name: "home",
      label: "Home"
    },
    {
      name: "packages",
      label: "Packages"
    },
    {
      name: "contact",
      label: "Contact"
    },
    {
      name: "assets",
      label: "Assets"
    },
    {
      name: "faq",
      label: "FAQ"
    },
    {
      name: "blank",
      label: "Blank page"
    },
    { name: "apostrophe-blog-page", label: "Blog Index" }

    // Add more page types here, but make sure you create a corresponding
    // template in lib/modules/apostrophe-pages/views/pages!
  ],
  construct: function(self, options) {
    var superPageBeforeSend = self.pageBeforeSend;
    self.pageBeforeSend = async (req, callback) => {
      const videos = await self.apos.modules["videos"]
        .find(req, {})
        .sort({ orderWeight: 1 })
        .toArray();
      const audios = await self.apos.modules["audios"]
        .find(req, {})
        .sort({ orderWeight: 1 })
        .toArray();
      const documents = await self.apos.modules["documents"]
        .find(req, {})
        .sort({ orderWeight: 1 })
        .toArray();
      const packages = await self.apos.modules["dd-packages"]
        .find(req, {})
        .sort({ title: 1 })
        .toArray();
      const schoolPackages = packages.filter(
        package => package.category === "school"
      );
      const ppaPackages = packages.filter(
        package => package.category === "ppa"
      );

      // locate vimeoID
      videos.forEach(function(vid) {
        var str = vid["vimeo-link"].url;
        vid.vimeoID = str.match(/(?:\/)(\d+)(?:\/)?/g)[0].replace("/", "");
      });

      // console.log('videos', JSON.stringify(videos));

      req.data.videos = videos;
      req.data.audios = audios;
      req.data.documents = documents;
      req.data.packages = packages;
      req.data.schoolPackages = schoolPackages;
      req.data.ppaPackages = ppaPackages;
      return superPageBeforeSend(req, callback);
    };
  }
};
