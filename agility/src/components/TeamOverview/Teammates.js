import React from "react"
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
import { withRouter } from "react-router-dom"
import Avatar from "../Avatar"

class Teammates extends React.Component {
  renderTeammates() {
    const teammatesArray = this.props.teamInfo.peopleByTeamId.nodes
    const userId = this.props.userId

    return teammatesArray.map(
      ({ id, firstName, lastName, position, userPictureUrl, email }) => {
        const selfNode = id === parseInt(userId)
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
    return <div>{this.renderTeammates()}</div>
  }
}

export default withRouter(Teammates)
