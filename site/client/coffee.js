Growers = new Meteor.Collection("growers");

Meteor.Router.add({
		  '/news': 'news',

		  '/about': function() {
		    if (Session.get('aboutUs')) {
		      return 'aboutUs';
		    } else {
		      return 'aboutThem';
		    }
		  }
		});

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
