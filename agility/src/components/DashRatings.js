import React from "react";
import { Rating, Header, Popup, Grid } from "semantic-ui-react";
import { graphql } from 'react-apollo'
import CreateRating from '../mutations/CreateRating'
import UpdateRating from '../mutations/UpdateRating'

class DashRatings extends React.Component {
  constructor(props) {
    super(props);

    this.state = { skills: {}, userRating: 0 };
  }

  componentDidMount() {
    this.hashRatings()
  }

  hashRatings() {
      console.log(this.props.ratings)
    const ratingsArr = this.props.ratings.nodes
    let userRating = 0
    let hash = {};
    ratingsArr.forEach(ratingByAcc => {
      let { skillName } = ratingByAcc.skillBySkillId;
      if (!hash[skillName]) {
        hash[skillName] = {
          ratings: [ratingByAcc.rating],
          count: 1
        };
      } else {
        hash[skillName].ratings.push(ratingByAcc.rating);
        hash[skillName].count++;
      }
      if(ratingByAcc.ratingBy === parseInt(this.props.userId)) {
          userRating = ratingByAcc.rating
      }
    });
    this.setState({ skills: hash, userRating })
  }

  // **TODO** on hover show non-rounded down rating
  // how to show your self rating
  // clarify how many people have voted on it
  // ensure only one rating per user for and by
  // if userRating is null do not render user rating, maybe link to page to add rating

  renderRatings() {
    // <Rating maxRating={5} onRate={this.handleRate} />
    // <pre>{JSON.stringify(this.state, null, 2)}</pre>
    return Object.keys(this.state.skills).map(skill => {
      const { ratings, count } = this.state.skills[skill];
      const averageRating = ratings.reduce((acc, currVal) => acc + currVal) / count;
      return (
        <div key={skill}>
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
                        defaultRating={this.state.userRating}
                        icon="star"
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

  // handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating })

  render() {
    console.log(this.state);
    return (
        <div>
            {this.renderRatings()}
        </div>
    )
  }
}

export default graphql(UpdateRating)(
    graphql(CreateRating)(DashRatings)
)

