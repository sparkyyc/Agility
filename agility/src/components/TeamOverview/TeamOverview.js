import React from "react"
import { graphql } from "react-apollo"
import { Header, Icon, Grid, Dimmer, Loader, Divider } from "semantic-ui-react"
import fetchTeamById from "../../queries/fetchTeamById"
import TeamSkills from "./TeamSkills"
import Teammates from "./Teammates"
import TeamNeeds from "./TeamNeeds"

class TeamOverview extends React.Component {
  render() {
    if (this.props.data.loading) {
      return (
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      )
    }
    return (
      <div>
        <Header as="h2" icon textAlign="center">
          <Icon name="users" circular />
          <Header.Content>{this.props.data.teamById.name}</Header.Content>
          <Header.Subheader>
            {this.props.data.teamById.description}
          </Header.Subheader>
        </Header>
        <Grid columns={3}>
          <Grid.Column>
            <Header>Average Team Skills</Header>
            <TeamSkills teamInfo={this.props.data.teamById} />
          </Grid.Column>
          <Grid.Column>
            <Header>Team Needs</Header>
            <TeamNeeds teamInfo={this.props.data.teamById} />
          </Grid.Column>
          <Grid.Column>
            <Header>Team</Header>
            <Teammates
              teamInfo={this.props.data.teamById}
              userId={this.props.currentUser.id}
            />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default graphql(fetchTeamById, {
  options: props => {
    return { variables: { id: parseInt(props.match.params.id) } }
  }
})(TeamOverview)
