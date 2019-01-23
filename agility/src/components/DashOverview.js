import React from "react";
import { Image, Segment, Header, Container, Grid } from "semantic-ui-react";
import '../styling/DashOverview.css'
class DashProfileOverview extends React.Component {
  calculateRatings() {}

  render() {
    console.log(this.props.userInfo);

    const {
      firstName,
      lastName,
      userPictureUrl,
      position
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
            <Grid.Column>Ratings</Grid.Column>
            <Grid.Column>Other</Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default DashProfileOverview;
