exports.index = function(req, res) {
 	res.render('index', { title: 'Ludum Dare 29' });
};

exports.fourohfour = function(req, res) {
	res.render('404', {});
};