import React from "react"
import {
  Image,
  Segment,
  Header,
  Container,
  Grid,
  Item,
  Button,
  Label,
  Icon
} from "semantic-ui-react"

import DashRatings from "./DashRatings"
import DashSkillAdd from "./DashSkillAdd"

import "./DashOverview.css"
import DashOverviewHeader from "./DashOverviewHeader"

class DashOverview extends React.Component {
  // **TODO**
  // show how many people voted on skill
  // add search for skill on show skill ratings side

  render() {
    //  console.log(this.props.userInfo);
    const {
      id,
      firstName,
      lastName,
      userPictureUrl,
      position,
      ratingsByRatingFor,
      email
    } = this.props.userInfo

    return (
      <div>
        <DashOverviewHeader userInfo={this.props.userInfo} />
        <br />
        <Segment color="teal">
          <Grid columns={2} divided>
            <Grid.Column width="10">
              <Header>Your skills</Header>
              <DashRatings
                currentUser={this.props.currentUser}
                ratings={ratingsByRatingFor}
                userId={id}
                handleRate={this.props.handleRate}
              />
            </Grid.Column>
            <Grid.Column width="6">
              <DashSkillAdd
                currentUser={this.props.currentUser}
                ratings={ratingsByRatingFor}
                userId={id}
                handleRate={this.props.handleRate}
              />
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    )
  }
}

export default DashOverview
