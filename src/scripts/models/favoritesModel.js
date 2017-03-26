import Backbone from 'backbone'

export var FavoritesModel = Backbone.Model.extend({
	urlRoot:  'api/favorites',
	idAttribute: '_id'
})

export var FavoritesCollection = Backbone.Collection.extend({
	model: FavoritesModel,
	url: 'api/favorites'
})