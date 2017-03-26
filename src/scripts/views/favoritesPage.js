import React from 'react'
import LeftMenu from './components/leftMenu'
import ACTIONS from '../actions'
import STORE from '../store'
import UTIL from '../util'

var FavoritesPage = React.createClass({
	componentWillMount:function(){
		ACTIONS.fetchFavorites()
		STORE.on('dataUpdated', ()=>{
			this.setState(STORE.data)
		})
	},
	componentWillUnmount:function(){
		STORE.off()
	},
	getInitialState:function(){
		return STORE.data
	},
	render:function(){
		console.log('state in favorites', this.state)
		return(
			<div id='favorites-container'>
				<LeftMenu />
				<FavoriteList favorites={this.state.favoriteCollection}/>
			</div>
		)
	}
})

var FavoriteList = React.createClass({
	createElements:function(singleElement){
		return (
			<Listing 
				key={singleElement.cid}
				listingImageURL={singleElement.get('imgUrl')}
				listingID={singleElement.get('listingID')}
				listingTitle={singleElement.get('title')}
				listingPrice={singleElement.get('price')}
			/>
		)
	},
	render:function(){
		// console.log('inside render',this.props.list)
		return(
			<div className='listings-list'>
				{this.props.favorites.models.map(this.createElements)}
			</div>
		)
	}	
})

var Listing = React.createClass({
	handleImgClick:function(id){
		location.hash= "detail/"+id
	},
	handleFavClick:function(){
		console.log('ive been clicked')
		ACTIONS.addFavorite({
			listingID: this.props.listingID,
		  	imgUrl: this.props.listingImageURL,
			price: this.props.listingPrice,
			title: this.props.listingTitle
		})
	},
	render:function(){
		return(
			<div key={this.props.keyID} id='single-listing'>
				<img onClick={()=>(this.handleImgClick(this.props.listingID))} src={this.props.listingImageURL} />
				<p id='listingTitle'>{UTIL.formatTitle(this.props.listingTitle)}</p>
				<p id='listingPrice'>${this.props.listingPrice}</p>
				<button onClick={()=>{this.handleFavClick()}} id='favoriteThis'>Favorite This</button>
			</div>
		)
	}
})
export default FavoritesPage