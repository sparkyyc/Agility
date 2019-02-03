import React from "react";
import { graphql } from "react-apollo";
import { Dimmer, Loader, Segment, Grid, Header } from "semantic-ui-react";
import UserInfoForm from "./UserInfoForm";
import FetchUser from "../../queries/fetchUser";

class EditForm extends React.Component {
  render() {
    if (this.props.data.loading) {
      return (
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      );
    }
    return (
      <Grid
        centered
        verticalAlign="middle"
        container
        style={{ height: "100%" }}
      >
        <Grid.Row>
          <Grid.Column>
            <Segment.Group>
              <Segment>
                <Header as="h2">User information</Header>
              </Segment>
              <Segment>
                <UserInfoForm
                  userInfo={this.props.data.personById}
                  userId={this.props.currentUser.id}
                />
              </Segment>
            </Segment.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default graphql(FetchUser, {
  options: props => {
    return { variables: { id: parseInt(props.currentUser.id) } };
  }
})(EditForm);
