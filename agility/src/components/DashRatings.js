import React from "react";
import { Rating, Header, Popup, Grid } from "semantic-ui-react";
import { graphql } from 'react-apollo'
import UpsertRating from '../mutations/UpsertRating'
import query from '../queries/fetchUserWithTeammates'

class DashRatings extends React.Component {

  hashRatings() {
    const ratingsArr = this.props.ratings.nodes
    let hash = {};
    let userHash = {}
    ratingsArr.forEach(ratingByAcc => {
      let { skillName, id } = ratingByAcc.skillBySkillId;
      if (!hash[skillName]) {
        hash[skillName] = {
          id,
          ratings: [ratingByAcc.rating],
          count: 1
        };
      } else {
        hash[skillName].ratings.push(ratingByAcc.rating);
        hash[skillName].count++;
      }
      if(ratingByAcc.ratingBy === parseInt(this.props.userId)) {
          userHash[skillName] = {
              id,
              rating: ratingByAcc.rating
          }
      }
    });
    return { skills: hash, userRatings: userHash }
  }

  // **TODO** on hover show non-rounded down rating
  // how to show your self rating
  // clarify how many people have voted on it
  // ensure only one rating per user for and by
  // if userRating is null do not render user rating, maybe link to page to add rating

  handleRate = (event, { rating, maxRating, skillid, skillname }) => {
  
    this.props.handleRate(skillid, rating)
}

  renderRatings() {
    // <Rating maxRating={5} onRate={this.handleRate} />
    const { skills, userRatings } = this.hashRatings()
    // console.log('dashRatings', this.state)
    console.log(this.state)
    return Object.keys(skills).map(skill => {
      const { ratings, count, id } = skills[skill];
      const averageRating = ratings.reduce((acc, currVal) => acc + currVal) / count;
      return (
        <div key={id}>
          <Header>{skill}</Header>
          <Popup 
            flowing
            hoverable
            position='right center'
            trigger={<Rating
                maxRating={5}
                rating={Math.floor(averageRating)}
                icon="star"
                disabled
          />}
          >
            <Grid centered divided columns={2}>
                <Grid.Column textAlign='center'>
                <Header as='h4'>Self-Rating:</Header>
                    <Rating
                        maxRating={5}
                        rating={userRatings[skill].rating}
                        icon="star"
                        onRate={this.handleRate}
                        skillid={id}
                        skillname={skill}
                    />
                </Grid.Column>
                <Grid.Column textAlign='center'>
                    <Header as='h4'>Average-Rating:</Header>
                    {averageRating}
                </Grid.Column>
            </Grid>
          </Popup>
        </div>
      );
    });
  }


  render() {
    // console.log(this.state);
    return (
        <div>
            {this.renderRatings()}
        </div>
    )
  }
}

export default graphql(UpsertRating)(DashRatings)

