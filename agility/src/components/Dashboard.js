import React from 'react'
import { graphql } from 'react-apollo'
import { Segment, Grid, Divider, Dimmer, Loader } from 'semantic-ui-react'

import SideNav from './SideNav'
import DashTeam from './DashTeam'
import DashOverview from './DashOverview'

import fetchUserWithTeammates from '../queries/fetchUserWithTeammates'
import UpsertRating from '../mutations/UpsertRating'

class Dashboard extends React.Component {

    constructor(props){
        super(props)

        this.state = { userId: parseInt(this.props.match.params.id) }
    }

    // **TODO** set state in dashboard components? State vs props

    handleRate = (skillid, rating) => {
        this.props.mutate({
            variables: { 
                ratingFor: parseInt(this.props.match.params.id), 
                ratingBy:  parseInt(this.props.match.params.id), 
                skillId: skillid, 
                rating },
                // update: {
                //     (cache, { data: { ratingFor: parseInt(this.props.match.params.id), 
                //         ratingBy:  parseInt(this.props.match.params.id), 
                //         skillId: skillid, 
                //         rating } }) => {
                //             const { personById } = cache.readQuery({ query: fetchUserWithTeammates })
                //              var index = personByIdratingsByRatingFor.findIndex(r => r.id == "john")
                //             cache.writeQuery({
                //                 query: fetchUserWithTeammates,
                //                 data: { personById: {...personById, personById.ratingsByRatingFor} }
                //             })
                //         }
                // }
                refetchQueries: [{ query: fetchUserWithTeammates, variables: { id: parseInt(this.props.match.params.id) } }],
        }).then((res) => {
            // console.log(this.props.data)
            // this.props.data.refetch()
            // this.setState({ userId: this.state.userId })
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
                <SideNav />
                <main>
                     <Grid columns={2} divided style={{ marginLeft: "5%"}}>
                        <Grid.Column width={4}>
                            <DashTeam paramId={this.props.match.params.id} teammates={this.props.data.personById.teamByTeamId} />
                        </Grid.Column>
                        <Divider vertical></Divider>
                        <Grid.Column>
                            <DashOverview userInfo={this.props.data.personById} handleRate={this.handleRate} />
                        </Grid.Column>
                    </Grid>
                </main>
            </div>
        )
    }
}
}

export default graphql(fetchUserWithTeammates, {
    options: (props) => { return { variables: { id: parseInt(props.match.params.id) } } }
})(graphql(UpsertRating)(Dashboard))

// graphql(UpsertRating)(Dashboard)
