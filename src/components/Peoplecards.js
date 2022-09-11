import React from 'react'
import './Peoplecards.css'

const Peoplecards = ({ item }) => {

    if (item.person !== null) {

        let mySrc = "https://st3.depositphotos.com/1322515/35964/v/1600/depositphotos_359648638-stock-illustration-image-available-icon.jpg"

        if (item.person.image !== null && item.person.image.medium !== null) {
            mySrc = item.person.image.medium
        }

        const myHref = `https://www.google.com/search?q=${item.person.name}`

        return (
            <div className='peopleCard' title={item.person.name}>
                <img src={mySrc} alt='ShowCard.jpg' />
                <h3><a href={myHref} target="_blank" rel="noreferrer">{item.person.name}</a></h3>
            </div>
        )
    }
    else {
        return ""
    }
}

export default Peoplecards

