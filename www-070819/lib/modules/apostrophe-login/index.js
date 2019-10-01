module.exports = {
  construct: function(self, options) {
    self.loginAfterLogin = function(req) {

		var endUser = false;

		// TODO: only go to resources if a school user - instructor also?
		req.user._groups.forEach(function(group){

			if (group.title.toLowerCase() == 'school' || group.title.toLowerCase() == 'instructor'){
				endUser = true;
				return
			}
		})

		if(endUser) req.redirect = '/resources';

		// req.redirect = '/resources';
    };
  }
};
