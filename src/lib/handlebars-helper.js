define(['handlebars'], function(Handlebars) {

	// upper case helper
    Handlebars.registerHelper('toUpperCase', function(value) {
        return (value && typeof value === 'string') ? value.toUpperCase() : '';
    });

});
