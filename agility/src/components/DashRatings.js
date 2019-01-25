import React from "react";
import { Rating, Header, Popup, Grid } from "semantic-ui-react";
import { graphql } from 'react-apollo'
import UpsertRating from '../mutations/UpsertRating'
import query from '../queries/fetchUserWithTeammates'

class DashRatings extends React.Component {
  constructor(props) {
    super(props);

    this.state = { skills: {}, userRatings: {} };
  }

  componentDidMount() {
    this.hashRatings()
  }

  hashRatings() {
    //   console.log(this.props.ratings)
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
    this.setState({ skills: hash, userRatings: userHash })
  }

  // **TODO** on hover show non-rounded down rating
  // how to show your self rating
  // clarify how many people have voted on it
  // ensure only one rating per user for and by
  // if userRating is null do not render user rating, maybe link to page to add rating

  handleRate = (event, { rating, maxRating, skillid, skillname }) => {
    // this.props.mutate({
    //     variables: { 
    //         ratingFor: parseInt(this.props.userId), 
    //         ratingBy:  parseInt(this.props.userId), 
    //         skillId: skillid, 
    //         rating },
    //         refetchQueries: [{ query, variables: { id: parseInt(this.props.userId) } }],
    // })
    // .then(() => {
    //     this.props.data.refetch()
    //     // this.setState({ 
    //     //     userRatings: {...this.state.userRatings, [skillname]: { id: skillid, rating } }
    //     // })
    // })
    this.props.handleRate(skillid, rating)
}

  renderRatings() {
    // <Rating maxRating={5} onRate={this.handleRate} />
    return Object.keys(this.state.skills).map(skill => {
      const { ratings, count, id } = this.state.skills[skill];
      const averageRating = ratings.reduce((acc, currVal) => acc + currVal) / count;
      return (
        <div key={id}>
          <Header>{skill}</Header>
          <Popup 
            flowing
            hoverable
            trigger={<Rating
                maxRating={5}
                defaultRating={Math.floor(averageRating)}
                icon="star"
                disabled
          />}
        //   content={`Average rating: ${averageRating} Self-Rating: ${this.state.userRating}`}
          >
            <Grid centered divided columns={2}>
                <Grid.Column textAlign='center'>
                <Header as='h4'>Self-Rating:</Header>
                    <Rating
                        maxRating={5}
                        defaultRating={this.state.userRatings[skill].rating}
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

