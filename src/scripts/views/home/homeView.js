import React from 'react'
import STORE from '../../store.js'
import ACTIONS from '../../actions.js'
	
class HomeView extends React.Component {
  
	constructor(props) {
	    
	    super(props);
	    this.state = {date: new Date()};
	    //ACTIONS.fetchData()
		// STORE.on('dataUpdated', () => {
		// 	this.setState(STORE.data)
		// })
  	}

	componentWillUnmount() {

		STORE.off('dataUpdated')

	}

	getInitialState() {

		return STORE.data

	}

  	render() {

    	return( 

    		<div> Hello </div> 

    	)

  	}

}

export default HomeView
