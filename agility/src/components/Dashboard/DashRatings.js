import React from "react"
import { Rating, Header, Popup, Grid, Card } from "semantic-ui-react"
import { graphql } from "react-apollo"
import UpsertRating from "../../mutations/UpsertRating"
import query from "../../queries/fetchUserWithTeammates"

class DashRatings extends React.Component {
  hashRatings() {
    const ratingsArr = this.props.ratings.nodes
    let hash = {}
    let userHash = {}
    ratingsArr.forEach(ratingByAcc => {
      let { skillName, id } = ratingByAcc.skillBySkillId
      if (!hash[skillName]) {
        hash[skillName] = {
          id,
          ratings: [ratingByAcc.rating],
          count: 1
        }
      } else {
        hash[skillName].ratings.push(ratingByAcc.rating)
        hash[skillName].count++
      }
      if (ratingByAcc.ratingBy === this.props.currentUser) {
        userHash[skillName] = {
          id,
          rating: ratingByAcc.rating
        }
      }
    })
    return { skills: hash, userRatings: userHash }
  }

  randomColor() {
    const colors = [
      "red",
      "orange",
      "yellow",
      "olive",
      "green",
      "teal",
      "blue",
      "violet",
      "purple",
      "pink",
      "brown",
      "grey",
      "black"
    ]

    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
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
    console.log(this.props)
    const ratingHead =
      this.props.currentUser === this.props.userId
        ? "Self-Rating:"
        : "Your Rating:"
    // console.log('dashRatings', this.state)
    console.log(this.state)
    return Object.keys(skills).map(skill => {
      const { ratings, count, id } = skills[skill]
      const averageRating =
        ratings.reduce((acc, currVal) => acc + currVal) / count
      const userRate = userRatings[skill] ? userRatings[skill].rating : 0
      return (
        <Card key={id} color={this.randomColor()} fluid>
          <Card.Content>
            <Card.Header>{skill}</Card.Header>
            <Card.Description>
              <Popup
                flowing
                hoverable
                position="right center"
                trigger={
                  <Rating
                    maxRating={5}
                    rating={Math.floor(averageRating)}
                    icon="star"
                    disabled
                  />
                }
              >
                <Grid centered divided columns={2}>
                  <Grid.Column textAlign="center">
                    <Header as="h4">{ratingHead}</Header>
                    <Rating
                      maxRating={5}
                      rating={userRate}
                      icon="star"
                      onRate={this.handleRate}
                      skillid={id}
                      skillname={skill}
                    />
                  </Grid.Column>
                  <Grid.Column textAlign="center">
                    <Header as="h4">Average-Rating:</Header>
                    {averageRating.toFixed(2)}
                  </Grid.Column>
                </Grid>
              </Popup>
            </Card.Description>
          </Card.Content>
        </Card>
      )
    })
  }

  render() {
    return (
      <Card.Group itemsPerRow="2" doubling>
        {this.renderRatings()}
      </Card.Group>
    )
  }
}

export default graphql(UpsertRating)(DashRatings)
