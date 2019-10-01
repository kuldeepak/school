module.exports = {
  extend: "apostrophe-pieces",
  name: "profile",
  label: "Profile",
  pluralLabel: "Profiles",
  addFields: [
    {
      name: "email",
      label: "Email",
      type: "string",
      required: true
    },
    {
      name: "group",
      label: "Group",
      type: "string",
      required: true
    },
    {
      name: "notifications",
      label: "Notifications",
      type: "boolean",
      required: true
    }
  ]
};
