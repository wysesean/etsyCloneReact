import React from 'react'
import LeftMenu from './components/leftMenu'
import ACTIONS from '../actions'
import STORE from '../store'
import UTIL from '../util'

var SearchPage = React.createClass({
	componentWillMount:function(){
		ACTIONS.fetchSearch(this.props.queryProp)
		STORE.on('dataUpdated', ()=>{
			this.setState(STORE.data)
		}).bind(this)
	},
	getInitialState:function(){
		return STORE.data
	},
	componentWillUnmount:function(){
		STORE.reset()
		STORE.off()
	},
	render:function(){
		return(
			<div id='home-page'>
				<LeftMenu />
				<ListingsList list={this.state.listingCollection} />
			</div>
		)
	}
})

var ListingsList = React.createClass({
	createElements:function(singleElement){
		if(singleElement.get('Images')[0]){
			return (
				<Listing 
					key={singleElement.cid}
					listingImageURL={singleElement.get('Images')[0].url_170x135}
					listingID={singleElement.get('listing_id')}
					listingTitle={singleElement.get('title')}
					listingPrice={singleElement.get('price')}
				/>
			)
		}
		else{
			<Listing 
				key={singleElement.cid}
				listingID={singleElement.get('listing_id')}
				listingTitle={singleElement.get('title')}
				listingPrice={singleElement.get('price')}
			/>
		}

	},
	render:function(){
		// console.log('inside render',this.props.list)
		return(
			<div className='listings-list'>
				{this.props.list.models.map(this.createElements)}
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
				<p id='listingTitle'>{this.props.listingTitle}</p>
				<p id='listingPrice'>${this.props.listingPrice}</p>
				<button onClick={()=>{this.handleFavClick()}} id='favoriteThis'>Favorite This</button>
			</div>
		)
	}
})



export default SearchPage