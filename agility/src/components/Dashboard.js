import React from 'react'
import { graphql } from 'react-apollo'
import { Segment, Grid, Divider, Dimmer, Loader } from 'semantic-ui-react'

import DashTeam from './DashTeam'
import DashOverview from './DashOverview'

import fetchUserWithTeammates from '../queries/fetchUserWithTeammates'
import UpsertRating from '../mutations/UpsertRating'

class Dashboard extends React.Component {

    handleRate = (skillid, rating) => {
        this.props.mutate({
            variables: { 
                ratingFor: parseInt(this.props.match.params.id), 
                ratingBy:  parseInt(this.props.match.params.id), 
                skillId: skillid, 
                rating 
            },
                refetchQueries: [{ query: fetchUserWithTeammates, variables: { id: parseInt(this.props.match.params.id) } }],
        })
    }

    render(){
        console.log(this.props.data)
        if(this.props.data.loading){
            return (
                    <Dimmer active inverted>
                        <Loader content='Loading' />
                    </Dimmer> 
            )
        } else {
        return(
            <div>
                     <Grid columns={2} divided >
                        <Grid.Column width={4}>
                            <DashTeam paramId={this.props.match.params.id} teammates={this.props.data.personById.teamByTeamId} />
                        </Grid.Column>
                        <Divider vertical></Divider>
                        <Grid.Column>
                            <DashOverview userInfo={this.props.data.personById} handleRate={this.handleRate} />
                        </Grid.Column>
                    </Grid>
            </div>
        )
    }
}
}

export default graphql(fetchUserWithTeammates, {
    options: (props) => { return { variables: { id: parseInt(props.match.params.id) } } }
})(graphql(UpsertRating)(Dashboard))

