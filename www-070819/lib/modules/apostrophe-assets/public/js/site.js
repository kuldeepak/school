$(function() {
  // Start with your project-level client-side javascript here.
  // JQuery and lodash (_) are both included with Apostrophe, so no need to
  // worry about including them on your own.

  toastr.options = {
	  "closeButton": true,
	  "debug": false,
	  "newestOnTop": false,
	  "progressBar": false,
	  "positionClass": "toast-top-center",
	  "preventDuplicates": false,
	  "onclick": null,
	  "showDuration": "300",
	  "hideDuration": "1000",
	  "timeOut": "5000",
	  "extendedTimeOut": "1000",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"
	}


  // console.log('Hello world.');
  function manageContactPageRadioGroupsAndRequiredFields() {
    $("#message").prop("required", true); // if general enquiry only

    $('input[name="formSections"]').click(function() {
      if ($(this).attr("id") == "generalEnquiry") {
        $("#bookingSection").hide();

        // setting up required for different inputs
        $("#message").prop("required", true);
        $("#packages").prop("required", false);
        $("#schoolName").prop("required", false);
        $("#headteacherName").prop("required", false);
        $("#address1").prop("required", false);
        $("#postcode").prop("required", false);
        $("#dateOption1").prop("required", false);
        $("#yearGroup").prop("required", false);
        $("#numberOfStudents").prop("required", false);

		$("#message+label").text("How can we help?");
      }
	  else if ($(this).attr("id") == "freeTrial" || $(this).attr("id") == "bookPackage") {

		$("#bookingSection").show();

        // setting up required for different inputs
        $("#message").prop("required", false);
        $("#packages").prop("required", true);
        $("#schoolName").prop("required", true);
        $("#headteacherName").prop("required", true);
        $("#address1").prop("required", true);
        $("#postcode").prop("required", true);
        $("#dateOption1").prop("required", true);

		$("#message+label").text("Additional comments");

        // NOTE: year group and student number only required for trial booking
        if ($(this).attr("id") == "bookPackage") {
          $("#yearGroup, #numberOfStudents").prop("required", false);
          $(".form-trial-only").hide();
        } else {
          $("#yearGroup, #numberOfStudents").prop("required", true);
          $(".form-trial-only").show();
        }
      }
    });

    // simulate click for default form
    $('input[name="formSections"]#generalEnquiry').click();
  }

  manageContactPageRadioGroupsAndRequiredFields();

  function submitFormCallback() {
    $("#contactUsForm").submit(function(e) {
      	e.preventDefault();
      	console.log("submitted form");
      	var data = {
        	name: $("#name").val(),
        	email: $("#email").val(),
        	phone: $("#phone").val(),
        	message: $("#message").val(),
        	packages: $("#packages").val(),
        	schoolName: $("#schoolName").val(),
        	headteacherName: $("#headteacherName").val(),
        	address1: $("#address1").val(),
        	address2: $("#address2").val(),
        	postcode: $("#postcode").val(),
        	dateOption1: $("#dateOption1").val(),
        	dateOption2: $("#dateOption2").val(),
        	dateOption3: $("#dateOption3").val(),
        	dateOption4: $("#dateOption4").val(),
        	yearGroup: $("#yearGroup").val(),
        	numberOfStudents: $("#numberOfStudents").val(),
        	subject: $('input[name="formSections"]:checked').val()
      	};
      	$.ajax({
        	url: "/modules/contact-form/contact-form",
        	method: "POST",
        	data: data
      	}).done(function(msg) {
			// TODO: show user friendly message after contact form is sent, look at toastr lib
        	// alert("We have received your request and will get back to you soon.");
        	toastr["success"]("Thank you for your email, we will get back to you as soon as we can!", "Email submitted");

			// clear form values
			// FIXME: prevents subject clearing
			$('#contactUsForm input:not([name="formSections"]), #contactUsForm textarea').val('');
      	});
    });
  }

  submitFormCallback();

  function getQueryParam(name) {
    var q = window.location.search.match(
      new RegExp("[?&]" + name + "=([^&#]*)")
    );
    return q && q[1];
  }
  function selectFormSectionsUsingUrlParams() {
    var url = window.location.href;
    var type = getQueryParam("type");
    var pckg = getQueryParam('pckg');

    if (type === "trial") {
      $("#freeTrial")
        .prop("checked", true)
        .trigger("click");
    } else if (type === "package") {
      $("#bookPackage")
        .prop("checked", true)
        .trigger("click");
    } else {
      $("#generalEnquiry")
        .prop("checked", true)
        .trigger("click");
    }

	if(pckg){
		// console.log('set package', pckg.replace(/%20/g,' '));
		// console.log('set package', $('select#packages') );

		$('select#packages').val( pckg.replace(/%20/g,' ') ).change();
	}
  }
  selectFormSectionsUsingUrlParams();

  function setClasses() {
    $("[data-mobile-class]").each(function() {
      var winWidth = $(window).width();
      //console.log('width', winWidth);
      var classes = $(this).attr("data-mobile-class");
      if (winWidth < 768) {
        //console.log('less than');
        //console.log('classes', classes);
        $(this).addClass(classes);
        $("body").addClass("lc-mobile");

        $("body").removeClass("lc-desktop");
      } else {
        $(this).removeClass(classes);
        $("body").removeClass("lc-mobile");

        $("body").addClass("lc-desktop");
      }
    });
    $("[data-desktop-class]").each(function() {
      var winWidth = $(window).width();
      //console.log('width', winWidth);
      var classes = $(this).attr("data-desktop-class");
      if (winWidth >= 768) {
        //console.log('more than');

        //console.log('classes', classes);
        $(this).addClass(classes);
      } else {
        $(this).removeClass(classes);
      }
    });

    // nav change on scroll (needed for home page only)
    $(document).scroll(function() {
      $("header.home").toggleClass(
        "scrolled",
        $(this).scrollTop() > $("header.home").height() * 2
      );
    });
    $("header.home").toggleClass(
      "scrolled",
      $(document).scrollTop() > $("header.home").height() * 2
    );
  }


	function sizeElements(){

		// TODO: make this a global var to remove 1 query from resize function (perf improvement)

		var eqHeightElements = $('.eq-height');

		$(eqHeightElements).each(function(i,v){
			// console.log('.eq-height', i);

			var maxHeight = 0;

			// TODO: remove previously set heights
			$(this).find('.eq-height-sizer').height('auto');

			$(this).find('.eq-height-sizer').each(function(){
			   if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
			});

			$(this).find('.eq-height-sizer').height(maxHeight);
		})

		var eqResetElements = $('.eq-height-reset .eq-height-sizer').height('auto')

	}

  	//Set desktop / mobile classes
  	setClasses();
  	sizeElements();
  	$(window).resize(function() {
    	setClasses();
		// TODO: find all instances of ".eq-height" and size children accordingly. To be done on window resize
		sizeElements();
  	});

  // unhide init elements (prevents seeing partially styled stuff before the above class logic kicks in)
  $(".lc-hide-before-load").each(function(i, v) {
    $(v).removeClass("lc-hide-before-load");
  });
});
