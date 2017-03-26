import Backbone from 'backbone'
import {ListingCollection} from './models/listingCollection'
import {DetailsModel} from './models/detailsModel.js'
import {FavoritesCollection, FavoritesModel} from './models/favoritesModel.js'

const STORE = Object.assign({}, Backbone.Events, {
	data:{
		listingCollection : new ListingCollection(),
		detailModel: new DetailsModel(),
		favoriteCollection: new FavoritesCollection()
	},
	get: function(prop){
		if(this.data[prop]===undefined){
			throw new Error("store does not have property named"+prop)
		}
		return this.data[prop]
	},
	set: function(attrs){
		this.data = Object.assign(this.data, attrs)
		this.trigger('dataUpdated')
	},
})

export default STORE