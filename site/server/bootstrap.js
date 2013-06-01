if (Meteor.isServer) {
	Meteor.startup(function () {
		if (Growers.find().count() === 0) {
			var names = ["Fondo Perez",
									 "Dean's Beans", "Yet Another Grower!"];
			for (var i = 0; i < names.length; i++)
				Growers.insert({name: names[i], rating: Math.floor(Math.random()*10)*5});
		}
	});
}
