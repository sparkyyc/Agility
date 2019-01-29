import React from "react";
import {
  Image,
  Segment,
  Header,
  Container,
  Grid,
  Item,
  Button,
  Label,
  Icon,
  Statistic
} from "semantic-ui-react";

import "./DashOverview.css";

class DashOverviewHeader extends React.Component {
  // **TODO**
  // show how many people voted on skill

  renderIsTeamLead() {
    return this.props.userInfo.teamLead ? (
      <Item.Extra className="userEmail">
        <Label as="a" color="blue" image>
          <Icon name="users" />
          Team Lead
          <Label.Detail>
            <Icon name="check" />
          </Label.Detail>
        </Label>
      </Item.Extra>
    ) : null;
  }

  renderSkillAverage() {
    let totalSkill = 0;
    let ratingsList = this.props.userInfo.ratingsByRatingFor.nodes;
    for (let item of ratingsList) {
      totalSkill += item.rating;
    }

    return (totalSkill / ratingsList.length).toFixed(2);
  }

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
    } = this.props.userInfo;

    return (
      <Grid columns="2">
        <Grid.Column width="8">
          <Item.Group>
            <Item style={{ fontSize: "1.5em" }}>
              <Item.Image src={userPictureUrl} size="small" rounded />
              <Item.Content>
                <Item.Header>
                  {firstName} {lastName}
                </Item.Header>
                <Item.Meta>{position}</Item.Meta>
                {this.renderIsTeamLead()}
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width="8" verticalAlign="middle">
          <Statistic.Group widths="1">
            <Statistic size="large">
              <Statistic.Value>{this.renderSkillAverage()}</Statistic.Value>
              <Statistic.Label>Average Skill Rating</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

export default DashOverviewHeader;
