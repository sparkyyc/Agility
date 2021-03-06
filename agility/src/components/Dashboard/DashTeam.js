import React from "react"
import { graphql } from "react-apollo"
import { withRouter } from "react-router-dom"
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
} from "semantic-ui-react"
import { classNames } from "classnames"

import "./DashTeam.css"
import Avatar from "../Avatar"

class DashTeam extends React.Component {
  constructor(props) {
    super(props)
  }

  renderTeammates() {
    const teammatesArray = this.props.teammates.peopleByTeamId.nodes
    const userId = this.props.currentUser

    return teammatesArray.map(
      ({ id, firstName, lastName, position, userPictureUrl, email }) => {
        const selfNode = id === parseInt(userId)
        return (
          <Card
            raised
            key={id}
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
                  >
                    <Avatar person={{ firstName, lastName, id, size: "3em" }} />
                  </Item.Image>
                  <Item.Content verticalAlign="top">
                    <Item.Header
                      key={id}
                      as="a"
                      onClick={() =>
                        this.props.history.push(`/dashboard/${id}`)
                      }
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
        )
      }
    )
  }

  render() {
    if (!this.props.teammates) {
      return (
        <Header as="h3">
          <Icon name="group" />
          <Header.Content>No team yet</Header.Content>
        </Header>
      )
    }
    const { name, id } = this.props.teammates
    return (
      <div>
        <Header as="h3" onClick={() => this.props.history.push(`/team/${id}`)}>
          <Icon name="group" />
          <Header.Content
            style={{ color: "black" }}
            as="a"
          >
            Team {name}
          </Header.Content>
        </Header>
        <Card.Group>{this.renderTeammates()}</Card.Group>
      </div>
    )
  }
}

export default withRouter(DashTeam)
