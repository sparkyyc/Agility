import React from "react";
import { Button, Card, Image, Segment, Item } from "semantic-ui-react";

class DashTeam extends React.Component {
  render() {
    return (
        <Card.Group>
          <Card raised>
            <Card.Content>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' src='http://placekitten.com/200/200' />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='a'>Austin Tindle</Item.Header>
                            <Item.Description>Team Scrumbledore</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Card.Content>
          </Card>
          <Card raised>
            <Card.Content>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' src='http://placekitten.com/200/200' />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='a'>Austin Tindle</Item.Header>
                            <Item.Description>Team Scrumbledore</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Card.Content>
          </Card>
          <Card raised>
            <Card.Content>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' src='http://placekitten.com/200/200' />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='a'>Austin Tindle</Item.Header>
                            <Item.Description>Team Scrumbledore</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Card.Content>
          </Card>
        </Card.Group>
    );
  }
}

export default DashTeam;
