import STORE from './store'
import {FavoritesModel} from './models/favoritesModel.js'
import {ListingCollection} from './models/listingCollection.js'
import {DetailsModel} from './models/detailsModel.js'
import config from '../../config/secrets.js'

var etsyKey = config.ETSY_KEY

var ACTIONS = {
	fetchAllListings:function(){
		var listingInstance = new ListingCollection()
		var promise = listingInstance.fetch({
			dataType: 'jsonp',
			data:{
                'includes' : 'Images',
				'api_key': etsyKey,
				'sort_on': 'score',
				'limit': '24' 
			}
		})
		promise.then(()=>{
			STORE.set({
				listingCollection: listingInstance
			})
		})
	},
	fetchDetailListing:function(itemID){
		var detailInstance = new DetailsModel()
		detailInstance._generate_URL(itemID)
		var promise = detailInstance.fetch({
			dataType: 'jsonp',
			data:{
	            'includes' : 'Images',
				'api_key': etsyKey,
			}
		})
		promise.then(()=>{
			STORE.set({
				detailModel: detailInstance
			})
		})
	},
	fetchFavorites:function(){
		var favoriteColl = STORE.get('favoriteCollection')
		favoriteColl.fetch()
			.then(function(){
				STORE.set({
					favoriteCollection: favoriteColl
				})
			})
	},

	addFavorite:function(favoriteData){
		console.log('addFavorite summoned')
		var favoriteInstance = new FavoritesModel(favoriteData)
		favoriteInstance.save().then(
			function(response){
				console.log('favorited')
			},
			function(err){
				console.log('problem favoriting')
				console.log(err)
			}
		)
	}

}

export default ACTIONS