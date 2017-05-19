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

                <button onClick={function(){ACTIONS.delete_blog_post("591f2ad2fd5781483c627022")}} > delete </button>

                <button onClick={function(){ACTIONS.create_blog_post( { title: 'my thoughts', description: 'you dont want to read my thoughts' } )}} > post </button>

            </div> 

        )

    }

}

export default HomeView
