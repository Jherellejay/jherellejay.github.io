var headerHeight;
$(document).ready(function() {

	if (new Date().getFullYear() > 2010) {
		$('#copyright').html("&copy; Copyright " + new Date().getFullYear());
	}

	if ($('#instafeed').length) {
		var feed = new Instafeed({
			limit: 9,
			get: 'user',
			userId: '350028890',
			accessToken: '1704624252.6d3219f.f9bbe216590341f8b45dbfa18e942115',
			resolution: 'standard_resolution',
			template: '<div class="third grid">' +
				'<a href="https://instagram.com/jherellejay">' +
				'<img class="instagram" data-original="{{image}}" alt="Instagram Image - {{id}}">' +
				'</a></div>',
			after: function() {
				var lazyLoad = new LazyLoad();
			}
		});
		feed.run();
	}

	checkParameters();
	$('#submit').click(submitForm);
	setHeaderStyle();
	$('a.mobile-menu').click(mobileMenu);

	if ((getDocumentHeight() - $('header').outerHeight(true)) > window.innerHeight) {
		$(window).scroll(setHeaderStyle);
	}
});

function mobileMenu() {
	if ($('nav ul li:visible').length > 0) {
		$('nav ul li').slideUp();
	} else {
		$('nav ul li').slideDown();
	}

	return false;
}

function setHeaderStyle() {
	if ($(document).scrollTop() > $('header').outerHeight(true)) {
		if (!$('header').hasClass('scroll')) {
			var h = $('header').outerHeight(true);
			$('header').addClass('scroll');
			$('body section:first').css('paddingTop', h + 'px');
		}
	} else {
		$('header').removeClass('scroll');
		$('body section:first').css('paddingTop', '0');
	}
}

function getDocumentHeight() {
	var body = document.body,
		html = document.documentElement;

	return Math.max(body.scrollHeight, body.offsetHeight,
		html.clientHeight, html.scrollHeight, html.offsetHeight);
}

function enquirySelect() {
	if ($('#enquiry-type').val() === '1') {
		$('.tat-enq').slideDown();
	} else {
		$('.tat-enq').slideUp();
	}
}

function checkParameters() {
	var parameters = window.location.search.substring(1);
	if (parameters.length) {
		values = parameters.split('=');

		if (values[0] === 'sent' && values[1] === 'true') {
			$('#confirm').show();
			$('form').hide();
		}
	}
}

function submitForm(e) {
	var name = $('input[name="name"]').val(),
		email = $('input[name="email"]').val(),
		enquiry = $('select').val(),
		msg = $('input[name="msg"]').val(),
		size = $('input[name="size"]').val(),
		placement = $('input[name="placement"]').val();

	if (name === '') {
		$('#error-msg').html('Please enter your name.');
		$('#error-msg').show();
		return false;
	} else if (msg === '') {
		$('#error-msg').html('Please enter a message.');
		$('#error-msg').show();
		return false;
	} else if (email === '') {
		$('#error-msg').html('Please enter your email address.');
		$('#error-msg').show();
		return false;
	} else if (enquiry === "1" && size === '') {
		$('#error-msg').html('Please enter the size of your tattoo.');
		$('#error-msg').show();
		return false;
	} else if (enquiry === "1" && placement === '') {
		$('#error-msg').html('Please enter the placement of your tattoo.');
		$('#error-msg').show();
		return false;
	} else if (!validateEmail(email)) {
		$('#error-msg').html('Please enter a valid email address.');
		$('#error-msg').show();
		return false;
	} else {
		$('#error-msg').html('');
		return true;
	}
	return false;
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}