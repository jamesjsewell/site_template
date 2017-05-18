import React from 'react'
import STORE from '../../store.js'
import ACTIONS from '../../actions.js'
	
class HomeView extends React.Component {
  
	constructor(props) {

	    super(props)
	    this.state = { data: STORE.data }
	   

  	}

  	componentWillMount() {

  		//ACTIONS.fetchData()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})

  	}

	componentWillUnmount() {

		STORE.off('dataUpdated')

	}

  	render() {
    	
    	return( 

    		<div className="home-view-wrapper">  
    			welcome to the homepage
    		</div> 

    	)

  	}

}

export default HomeView
