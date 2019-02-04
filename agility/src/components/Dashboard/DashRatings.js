import React from "react"
import { Rating, Header, Popup, Grid, Card, Image } from "semantic-ui-react"
import { graphql } from "react-apollo"
import UpsertRating from "../../mutations/UpsertRating"
import query from "../../queries/fetchUserWithTeammates"
import symbol0 from "../../assets/skill_0.png"
import symbol1 from "../../assets/skill_1.png"
import symbol2 from "../../assets/skill_2.png"
import symbol3 from "../../assets/skill_3.png"
import symbol4 from "../../assets/skill_4.png"

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

  renderSymbol(average) {
    switch (true) {
      case average <= 1:
        return <Image src={symbol0} size="mini" centered />
        break
      case average <= 2:
        return <Image src={symbol1} size="mini" centered />
        break
      case average <= 3:
        return <Image src={symbol2} size="mini" centered />
        break
      case average <= 4:
        return <Image src={symbol3} size="mini" centered />
        break
      case average <= 5:
        return <Image src={symbol4} size="mini" centered />
        break
      default:
        return null
    }
  }

  renderRatings() {
    const { skills, userRatings } = this.hashRatings()
    const ratingHead =
      this.props.currentUser === this.props.userId
        ? "Self-Rating:"
        : "Your Rating:"
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
                position="top center"
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
                  <Grid.Column
                    textAlign="center"
                    style={{ paddingRight: "50px" }}
                  >
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
                    <Header as="h4">Rank:</Header>
                    {this.renderSymbol(averageRating)}
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
