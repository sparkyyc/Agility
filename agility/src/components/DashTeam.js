import React from "react";
import { graphql } from "react-apollo";
import {
  Card,
  Item,
  Header,
  Icon,
  Segment,
  Meta,
  Extra,
  Button,
  Message
} from "semantic-ui-react";
import { classNames } from "classnames";

import "./DashTeam.css";

class DashTeam extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props);
  }

  renderTeammates() {
    const teammatesArray = this.props.teammates.peopleByTeamId.nodes;
    const userId = this.props.paramId;
    const teamName = this.props.teammates.teamName;
    const teamId = this.props.teammates.id;

    console.log(teammatesArray);

    // teammatesArray.unshift({});

    return teammatesArray.map(
      ({ id, firstName, lastName, position, userPictureUrl, email }) => {
        const selfNode = id === parseInt(userId);
        return (
          <Card
            raised
            key={id}
            fluid
            style={{
              backgroundColor: selfNode ? "#E8EAF6" : "#fff"
            }}
          >
            <Card.Content>
              <Item.Group>
                <Item>
                  <Item.Image
                    className="hideOverflow"
                    size="tiny"
                    rounded
                    bordered
                    src={userPictureUrl}
                  />
                  <Item.Content verticalAlign="top">
                    <Item.Header
                      key={id}
                      as="a"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      {firstName} {lastName}
                      {selfNode ? (
                        <Message
                          compact
                          style={{
                            padding: "2px 8px",
                            fontSize: ".7em"
                          }}
                        >
                          <Icon name="user outline" />
                          You
                        </Message>
                      ) : null}
                    </Item.Header>
                    <Item.Meta className="itemMeta">{position}</Item.Meta>
                    <Item.Description className="userEmail">
                      <Button basic as="a" fluid href={`mailto:${email}`}>
                        {email}
                      </Button>
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Card.Content>
          </Card>
        );
      }
    );
  }

  render() {
    return (
      <div>
        <Header as="h3">
          <Icon name="group" />
          <Header.Content>Team {this.props.teammates.name}</Header.Content>
        </Header>
        <Card.Group>{this.renderTeammates()}</Card.Group>
      </div>
    );
  }
}

export default DashTeam;
