import React from "react";
import { graphql } from 'react-apollo'
import { Card, Item, Dimmer, Loader, Header, Icon, Segment } from "semantic-ui-react";
import query from '../queries/fetchTeammates'

class DashTeam extends React.Component {
    renderTeammates(){
        if(!this.props.data.personById) return 
        const teammatesArray = this.props.data.personById.teamByTeamId.peopleByTeamId.nodes
        const userId = this.props.data.personById.id
        const teamName = this.props.data.personById.teamByTeamId.teamName
        const teamId = this.props.data.personById.teamByTeamId.id

        return teammatesArray.map(({ id, firstName, lastName, position, userPictureUrl }) => {
            if(id === userId) return
            return (
                <Card raised>
                    <Card.Content>
                        <Item.Group>
                            <Item>
                                <Item.Image size='tiny' src={userPictureUrl} />
                                <Item.Content verticalAlign='middle'>
                                    <Item.Header key={id} as='a'>{firstName} {lastName}</Item.Header>
                                    <Item.Description>{position}</Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Card.Content>
                </Card>
            )
        })
    }

  render() {
      console.log(this.props)
    if(this.props.data.loading){
        return (
            <Card>
                <Card.Content>
                    <Dimmer active inverted>
                        <Loader content='Loading' />
                    </Dimmer>
                </Card.Content>
            </Card>
        )
    } else {
        return (
            <div>
                <Header as='h3'>
                    <Icon name='group' />
                    <Header.Content>Team {this.props.data.personById.teamByTeamId.teamName}</Header.Content>
                </Header> 
                <Card.Group>
                    {this.renderTeammates()}
                </Card.Group>
            </div>
        )
    }
  }
}

export default graphql(query, {
    options: (props) => { return { variables: { id: parseInt(props.paramId) } } }
})(DashTeam);


