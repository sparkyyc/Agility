import React from "react";
import { graphql } from 'react-apollo'
import { Card, Item, Header, Icon, Segment } from "semantic-ui-react";


class DashTeam extends React.Component {
    renderTeammates(){
        const teammatesArray = this.props.teammates.peopleByTeamId.nodes
        const userId = this.props.paramId
        const teamName = this.props.teammates.teamName
        const teamId = this.props.teammates.id

        return teammatesArray.map(({ id, firstName, lastName, position, userPictureUrl }) => {
            if(id === parseInt(userId)) return
            return (
                <Card raised key={id} >
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
        return (
            <div>
                <Header as='h3'>
                    <Icon name='group' />
                    <Header.Content>Team {this.props.teammates.name}</Header.Content>
                </Header> 
                <Card.Group>
                    {this.renderTeammates()}
                </Card.Group>
            </div>
        )
    }
}

export default (DashTeam);


