module.exports = {
  extend: "apostrophe-pieces",
  name: "contact-form",
  label: "Contact Form",
  alias: "contactForm",
  construct: async (self, options) => {
    self.route("post", "contact-form", async (req, res) => {
      // console.log("contact-from incoming content", JSON.stringify(req.body));

      var subject;
      var template = "contactForm";
	  var defaultEmail = "schools@diversedancemix.com";
	  // var defaultEmail = "Dave@letscreateweb.com";
	  // var defaultEmail = "";

      switch (req.body.subject) {
        case "general":
          subject = "General enquiry";
          template = "enquiryEmail";
          break;
        case "trial":
          subject = "Trial booking";
          template = "trialEmail";
          break;
        case "package":
          subject = "Package booking";
          template = "packageEmail";
          break;
      }

      try {
        var profilesEmails = [];
        var users = await self.apos.modules["apostrophe-users"]
          .find(req, {})
          .sort({ title: 1 })
          .toArray()

		// loop through users and check if it has an attached "admin" group and notifications are true
		var profiles =  users.filter(
            user => {
				if(user._groups){
					var isAdmin = user._groups.filter( group => {
						if (group.title === 'admin') {
							return group;
						}
					} ).length > 0

					// console.log(`${user.email} notifications: isAdmin:`, isAdmin )

					if (user.notifications === true && isAdmin){
						return user
					}
				}
			}
          );

		// console.log('[contact-form] profiles', profiles);


        profilesEmails = profiles.map(profile => profile.email);
		// console.log('[contact-form] email list', profilesEmails);

		// console.log('[contact-form] raw users', users);

		// ensures theres at least one admin email being addressed
		profilesEmails = profilesEmails.concat([defaultEmail]);
		profilesEmails = profilesEmails.join('|').toLowerCase().split('|');

        profilesEmails = profilesEmails.filter(onlyUnique);

        console.log("sending email to:", profilesEmails);

        await self.email(
          req,
          template,
          { ...req.body },
          {
            from: "schools@diversedancemix.com",
            to: profilesEmails,
            // to: ['dave@letscreateweb.com'],
            subject: "DDMIX for Schools - " + subject
          }
        );
        res.send({});
      } catch (error) {
        console.log('error sending "contact us" email', error);
      }
    });
  }
};

function onlyUnique(value, index, self) {

	// console.log('[onlyUnique]',value,index,self);

  return self.indexOf( String(value).toLowerCase() ) === index;
}
