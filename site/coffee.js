Growers = new Meteor.Collection("growers");

if (Meteor.isClient) {
	Template.featured.growers = function () {
		return Growers.find({}, {sort: {score: -1, name: 1}});
	};

	Template.featured.selected_name = function () {
		var grower = Growers.findOne(Session.get("selected_grower"));
		return grower && grower.name;
	};

	Template.grower.selected = function () {
		return Session.equals("selected_grower", this._id) ? "selected" : '';
	};

	Template.featured.events({
		'click input.inc': function () {
			Players.update(Session.get("selected_grower"), {$inc: {score: 5}});
		}
	});

	Template.grower.events({
		'click': function () {
			Session.set("selected_grower", this._id);
		}
	});
}

if (Meteor.isServer) {
	Meteor.startup(function () {
		if (Growers.find().count() === 0) {
			var names = ["Fondo Perez",
									 "Dean's Beans"];
			for (var i = 0; i < names.length; i++)
				Growers.insert({name: names[i], rating: Math.floor(Math.random()*10)*5});
		}
	});
}
