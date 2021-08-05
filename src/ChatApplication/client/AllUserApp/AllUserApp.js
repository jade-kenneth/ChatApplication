import React from 'react'
import './scss/UserApp.css';
const AllUserApp = ({id,username}) => {
    return (
        <div className="all_user_container">
            
            <div className="row">
                <div className="custom-avatar">
                    <h2>{`${username.substring(0,1)}`}</h2>
                </div>
                <h2>{username}</h2>
            </div>
            

        </div>
    )
}

export default AllUserApp
