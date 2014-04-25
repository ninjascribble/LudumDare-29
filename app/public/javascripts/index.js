;(function(global, $, _, Phaser, io) {

	var body = $('body');

	if ($) body.append('<p><strong>jQuery</strong> is working!</p>');
	if (_) body.append('<p><strong>Underscore</strong> is working!</p>');
	if (Phaser) body.append('<p><strong>Phaser</strong> is working!</p>');
	if (io) body.append('<p><strong>Socket.io</strong> is working!</p>');

}(this, jQuery, _, Phaser, io));