import React from 'react'
import STORE from '../../STORE.js'
import ACTIONS from '../../ACTIONS.js'

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

    registerUser(evt) {
        evt.preventDefault()
        //ACTIONS.registerUser({email: 'bob', password: 'bob', username: 'bob'})
    }

    loginUser(evt) {
        evt.preventDefault()
        //ACTIONS.logUserIn('bob', 'bob')
    }

    render() {

        return( 

            <div className="home-view-wrapper">  

                welcome to the homepage

                <button onClick={function(){ACTIONS.create_blog_post( { title: 'my thoughts', description: 'you dont want to read my thoughts' } )}} > post </button>

                <button onClick={function(){ACTIONS.get_blog_posts( { title: 'my thoughts updated' } )}} > get filtered </button>

                <button onClick={function(){ACTIONS.get_blog_posts( {} )}} > get all </button>

                <button onClick={function(){ACTIONS.update_blog_post( "591f2ac7fd5781483c627021", { title: 'my thoughts updated', description: 'you still dont want to read my thoughts' } )}} > update </button>

                <button onClick={function(){ACTIONS.delete_blog_post("591f2ad2fd5781483c627022")}} > delete </button>

                <button onClick={this.registerUser} > register test </button>

                <button onClick={this.loginUser} > login test </button>



            </div> 

        )

    }

}

export default HomeView
