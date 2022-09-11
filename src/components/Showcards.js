import React from 'react'
import './Showcards.css'

const Showcards = ({ item }) => {
    if (item.show.summary !== null) {
        // if (item.show.image !== undefined && item.show.image !== null && item.show.image.medium != null && item.show.summary !== null) {
        let mySrc = "https://st3.depositphotos.com/1322515/35964/v/1600/depositphotos_359648638-stock-illustration-image-available-icon.jpg"
        if (item.show.image !== null && item.show.image.medium !== null) {
            mySrc = item.show.image.medium
        }

        const mystr = (item.show.summary).replace(/(<([^>]+)>)/ig, '')
        const myHref = `https://www.google.com/search?q=${item.show.name}`
        let myRating = "Unrated";
        if (item.show.rating.average !== null) {
            myRating = `${item.show.rating.average}⭐`
        }

        return (
            <div className='showCard' title={item.show.name}>
                <img src={mySrc} alt='ShowCard.jpg' />
                <h3><a href={myHref} target="_blank" rel="noreferrer">{item.show.name}</a></h3>
                <p>{mystr}</p>
                <div className='showScore'>{myRating}</div>
            </div>
        )
    }
    else {
        return ""
    }
}

export default Showcards
