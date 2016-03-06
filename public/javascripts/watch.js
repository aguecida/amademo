$(document).ready(function() {
	function switchActiveChat() {
		$('.user-comment-section.active').fadeOut(200, function() {
			$(this).removeClass('active');
			$(this).siblings().fadeIn(200, function() {
				$(this).addClass('active');
			});
		});
	}

	$('[data-toggle="tooltip"]').tooltip();

	$('body').click(function(e) {
		if (!$(e.target).hasClass('search-input') && !$(e.target).hasClass('search-btn')) {
			$('#search').removeClass('border-glow');
		}
	});

	$('#questions').on('click', '.question ', function() {
		var overlay = $('#overlay-template').removeClass('hide');
		$(this).append(overlay);
	});

	$('#overlay-template').on('click', '.close-btn', function(e) {
		$('#overlay-template').addClass('hide');
		e.stopPropagation();
	});

	$('#comments-header-tabs').on('click', 'a', function() {
		if ($(this).parent().hasClass('active')) {
			return;
		}

		var username;

		if ($(this).parent().hasClass('general-tab')) {
			$('.question-ref-content').slideUp(400);
			$('.question-ref-content > div').fadeTo(400, 0);
		}
		else {
			username = $(this).parent().data('user');
			if ($(this).parent().siblings('.active').hasClass('general-tab')) {
				$('.question-ref-header').find('.user').html(username);
				$('.question-ref-content').slideDown(400);
				$('.question-ref-content > div').fadeTo(400, 1);
			}
			else {
				$('.question-ref-content > div').fadeTo(200, 0, function() {
					$('.question-ref-header').find('.user').html(username);
					$(this).fadeTo(200, 1);
				});
			}
		}

		var index = $(this).parent().index();
		var margin = index * 110;

		$(this).parent().siblings('.active').removeClass('active');
		$(this).parent().siblings('hr').css('margin-left', margin.toString() + 'px');
		$(this).parent().addClass('active');

		switchActiveChat();
	});

	$('.commands-list').on('click', '.comment', function() {
		var username = $(this).parent().parent().siblings().find('.user').html();
		var question = $(this).parent().parent().siblings().find('.user').siblings('p:last').html();
		var mediaIcon = $(this).parent().parent().siblings('.media-channel').find('i');
		var mediaChannel, mediaChannelColour, cancel;

		$('#comments-header-tabs ul li').each(function() {
			if ($(this).data('user') === username) {
				cancel = true;
				return;
			}
		});

		if (cancel) {
			return;
		}

		if ($(mediaIcon).hasClass('fa-twitter')) {
			mediaChannel = 'fa-twitter';
			mediaChannelColour = 'twitter-colour';
		}
		else if ($(mediaIcon).hasClass('fa-facebook')) {
			mediaChannel = 'fa-facebook';
			mediaChannelColour = 'facebook-colour';
		}
		else if ($(mediaIcon).hasClass('fa-video-camera')) {
			mediaChannel = 'fa-video-camera';
			mediaChannelColour = 'video-camera-colour';
		}
		else if ($(mediaIcon).hasClass('fa-pencil')) {
			mediaChannel = 'fa-pencil';
			mediaChannelColour = 'pencil-colour';
		}

		if ($('#comments-header-tabs ul').find('.general-tab').hasClass('active')) {
			$('.question-ref-header').find('.user').html(username);
			$('.question-ref-body').html(question);
			$('.question-ref-header').find('i').removeClass().addClass('fa').addClass(mediaChannel).addClass(mediaChannelColour);
			$('.question-ref-content').slideDown(400);
			$('.question-ref-content > div').fadeTo(400, 1);
		}
		else {
			$('.question-ref-content > div').fadeTo(200, 0, function() {
				$('.question-ref-header').find('.user').html(username);
				$('.question-ref-body').html(question);
				$('.question-ref-header').find('i').removeClass().addClass('fa').addClass(mediaChannel).addClass(mediaChannelColour);
				$(this).fadeTo(200, 1);
			});
		}

		$('<li title="' + username + '" data-user="' + username + '"><a>' + username + '</a></li>').insertBefore('#comments-header-tabs hr');
		$('#comments-header-tabs ul').find('.active').removeClass('active');
		$('#comments-header-tabs ul li').last().addClass('active');

		var index = $('#comments-header-tabs ul li').last().index();
		var margin = index * 110;
		$('#comments-header-tabs').find('hr').css('margin-left', margin.toString() + 'px');

		$('html,body').animate({ scrollTop: $('#comments').offset().top }, 800, 'swing');

		switchActiveChat();
	});

	$('#search').on('click', '.search-input', function(e) {
		$(this).parent().addClass('border-glow');
		e.stopPropagation();
	});

	$('#video-stats').on('click', '#video-wub', function() {
		if ($(this).hasClass('fa-heart')) {
			return;
		}

		$(this).removeClass('fa-heart-o').addClass('fa-heart').css('color', 'tomato');
		var wubs = parseInt($(this).siblings('span').html());
		$(this).siblings('span').text(wubs + 1);

		// Change tooltip
		$(this).tooltip('destroy');
		$(this).removeAttr('title');
		$(this).siblings('span').removeAttr('title');
		$(this).parent().attr('title', 'Wubs');
	});

	$('.video-question-play').click(function(e) {
		e.stopPropagation();
	});

	$('.commands-list').on('click', '.play', function() {
		var username = $(this).parent().parent().siblings().find('.user').html();

		if (username === '@harveyspecter') {
			seekTo(102);
		}
		else if (username === 'legitlawyer99') {
			seekTo(210);
		}
		else if (username === '@yougotlittup') {
			seekTo(273);
		}
		else if (username === 'rachelzane') {
			seekTo(688);
		}
		else if (username === 'Jessica Pearson') {
			seekTo(758);
		}
		else {
			seekTo(589);
		}
	});
});