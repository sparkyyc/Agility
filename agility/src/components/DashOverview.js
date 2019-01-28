import React from "react";
import { Image, Segment, Header, Container, Grid } from "semantic-ui-react";
import '../styling/DashOverview.css'

import DashRatings from './DashRatings'
import DashSkillAdd from './DashSkillAdd'
class DashProfileOverview extends React.Component {

    // **TODO**
    // show how many people voted on skill

  render() {
    //  console.log(this.props.userInfo);
    const {
      id,
      firstName,
      lastName,
      userPictureUrl,
      position,
      ratingsByRatingFor
    } = this.props.userInfo;

    return (
      <div className="dashOverview" >
        <div className="userInfo" >
          <Image className="userPic" src={userPictureUrl} size="small" rounded/>
          <div className="userDetails" >
            <Header size="large" dividing>
                {firstName} {lastName}
            </Header>
          {position}
          </div>
        </div>
        <div>
          <Grid columns={2} divided>
            <Grid.Column>
                <DashRatings ratings={ratingsByRatingFor} userId={id} handleRate={this.props.handleRate} />
            </Grid.Column>
            <Grid.Column>
                <DashSkillAdd ratings={ratingsByRatingFor} userId={id} handleRate={this.props.handleRate} />
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default DashProfileOverview;
