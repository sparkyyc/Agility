import React from 'react'

import SideNav from './SideNav'
import DashTeam from './DashTeam'

class Dashboard extends React.Component {

    render(){
        return(
            <div>
                <SideNav />
                <main>
                    <DashTeam />

                </main>
            </div>
        )
    }
}

export default Dashboard