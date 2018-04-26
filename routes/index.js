const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

keystone.pre('routes', function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Colombia', key: 'colombia', href: '/colombia' },
		{ label: 'Contenido', key: 'contenido', href: '/contenido' },
		{ label: 'Galeria', key: 'gallery', href: '/gallery' },
		{ label: 'Contáctenos', key: 'contact', href: '/contact' },
	];
	res.locals.user = req.user;
	next();
});

keystone.pre('render', middleware.theme);
keystone.pre('render', middleware.flashMessages);

keystone.set('404', function (req, res, next) {
    middleware.theme(req, res, next);
	res.status(404).render('errors/404');
});

// Load Routes
var routes = {
	download: importRoutes('./download'),
	views: importRoutes('./views'),
};

exports = module.exports = function (app) {

	// Views
	app.get('/', routes.views.index);
	app.get('/contenido/:category?', routes.views.blog);
	app.all('/contenido/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);
	app.get('/colombia', routes.views.colombia);
	

	// Downloads
	app.get('/download/users', routes.download.users);

}
