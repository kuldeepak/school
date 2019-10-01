// This configures the apostrophe-users module to add an admin-level
// group by default:

module.exports = {
  groups: [
    {
      title: "guest",
      permissions: ["guest"]
    },
    {
      title: "school",
      permissions: ["guest"]
    },
    {
      title: "instructor",
      permissions: ["guest", "schedules"]
    },
    {
      title: "admin",
      permissions: ["admin"]
    }
  ],
  email: {
    // default "from" address for this module
    from: "schools@diversedancemix.com"
  },
  beforeConstruct: function(self, options) {
    options.addFields = [
      {
        type: "password",
        name: "password",
        label: "Password",
        def: "123Test!@£"
      },
      {
        type: "boolean",
        name: "dataAcceptanceConfirmed",
        label: "Data Acceptance Confirmed",
        def: true
      },
      {
        type: "boolean",
        name: "termsConfirmed",
        label: "Terms Confirmed",
        def: true
      },
      {
        type: "boolean",
        name: "notifications",
        label: "Notifications",
        def: false
      }
    ].concat(options.addFields || []);
    options.arrangeFields = [
      {
        name: "basics",
        label: "Basics",
        fields: [
          "firstName",
          "lastName",
          "title",
          "username",
          "email",
          "slug",
          "group",
          "_groups",
          "disabled",
          "slug",
          "dataAcceptanceConfirmed",
          "termsConfirmed",
          "notifications",
          "password"
        ]
      }
    ].concat(options.arrangeFields || []);
  },
  construct: function(self, options) {
    self.beforeSave = async function(req, piece, options, callback) {
      const userGroupId = piece.groupIds[0];
      const groups = await self.apos.modules["apostrophe-groups"]
        .find(req, {})
        .sort({ title: 1 })
        .toArray();
      const userGroup = groups.filter(group => (group._id = userGroupId))[0];

	  // TODO: only run an insert if this is a new user

      /*await self.apos.modules["profiles"].insert(
        {},
        {
          title: piece.title,
          slug: piece.slug,
          published: true,
          email: piece.email,
          group: userGroup.title,
          notifications: piece.notifications || false
        },
        { permissions: false }
      );*/
      return callback();
    };
    self.afterInsert = function(req, piece, options, callback) {
      return self.email(
        req,
        "welcomeNewUser",
        {
          piece: piece,
          host: process.env.HOST || "http://192.168.33.10:3000"
        },
        {
          // can also specify from and other
          // valid properties for nodemailer messages here
          to: piece.email,
          subject: "A new account was created"
        },
        callback
      );
    };
  }
};
