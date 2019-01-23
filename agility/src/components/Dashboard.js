import React from 'react'

import { Segment, Grid, Divider } from 'semantic-ui-react'

import SideNav from './SideNav'
import DashTeam from './DashTeam'

class Dashboard extends React.Component {

    render(){
        return(
            <div>
                <SideNav />
                <main>
                     <Grid columns={2} divided style={{ marginLeft: "5%"}}>
                        <Grid.Column width={4}>
                            <DashTeam paramId={this.props.match.params.id}/>
                        </Grid.Column>
                        <Divider vertical></Divider>
                        <Grid.Column>
                            Profile
                        </Grid.Column>
                    </Grid>
                </main>
            </div>
        )
    }
}

export default Dashboard