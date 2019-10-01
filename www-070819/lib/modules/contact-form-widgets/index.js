module.exports = {
  extend: "apostrophe-widgets",
  label: "Contact Form",
  contextualOnly: true,
  scene: "user",

  construct: function(self, options) {
    self.forms = self.apos.contactForm;
    self.apos.app.post(
      "/modules/contact-form-widgets/submit",
      async (req, res) => {
        console.log("This is the backend");
        console.log(req.body);
        await self.email(
          req,
          "userInquiry",
          {
            piece: req.body
          },
          {
            // can also specify from and other
            // valid properties for nodemailer messages here
            from: req.body.email,
            to: "dave@letscreateweb.com",
            subject: "User Enquiry",
            text: req.body.message
          }
        );
        return self.forms.submit(req, function(err) {
          return res.send({ status: err ? "error" : "ok" });
        });
      }
    );

    self.output = function(widget, options) {
      return self.partial(self.template, {
        widget: widget,
        options: options,
        manager: self,
        schema: self.forms.submitSchema
      });
    };

    self.pushAsset("script", "always", { when: "always" });
    self.pushAsset("stylesheet", "always", { when: "always" });

    self.route("post", "submit", function(req, res) {
      console.log(req.body);
      return self.forms.submit(req, function(err) {
        return res.send({ status: err ? "error" : "ok" });
      });
    });

    var superGetCreateSingletonOptions = self.getCreateSingletonOptions;
    self.getCreateSingletonOptions = function(req) {
      var options = superGetCreateSingletonOptions(req);
      options.submitSchema = self.forms.submitSchema;
      options.piece = self.forms.newInstance();
      return options;
    };
  }
};
