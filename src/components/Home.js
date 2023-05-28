import React from 'react'
import Note from './Note'
import AddNote from './AddNote'

const Home = (props) => {


    return (
        <>
            <AddNote alert={props.alrt} />
            <Note alert={props.alrt} />


        </>
    )
}

export default Home