import React from 'react'
import Showcards from './Showcards'
import Peoplecards from './Peoplecards'

const Cards = (props) => {
    const data = props.data
    const choice = props.choice


    if (data.length > 2) {
        return (
            <>
                {
                    (choice === "shows") ? (
                        data.map((item) => {
                            if (item != null && item.show.id !== undefined && item.show !== null && item.show.id !== null
                            ) {
                                return <Showcards key={item.show.id} item={item} />
                            }
                            return ""
                        })
                    ) : (choice === "people") ? (
                        data.map((item) => {
                            if (item != null && item.person !== null && item.person.id !== null
                                && item.person.id !== undefined) {
                                return <Peoplecards key={item.person.id} item={item} />
                            }
                            return ""
                        })
                    ) : ""
                }
            </>
        )
    }

}

export default Cards
