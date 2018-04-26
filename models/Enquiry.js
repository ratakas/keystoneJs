var keystone = require('keystone');
var Types = keystone.Field.Types;

var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
});

Enquiry.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true },
	phone: { type: String },
	enquiryType: { type: Types.Select, options: [
		{ value: 'Salud', label: "Sistema de Seguridad Social en Salud" },
		{ value: 'Pensiones', label: "Sistema de Seguridad Social en Pensiones" },
		{ value: 'Labores', label: "Sistema de Seguridad Social en Riesgos Laborales" },
		{ value: 'Other', label: "Otros" },
	], required: true },
	message: { type: Types.Textarea, required: true },
});

Enquiry.track = true;
Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();
