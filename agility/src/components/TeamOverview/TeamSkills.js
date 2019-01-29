import React from "react"
import { Rating, Header, Popup, Grid, Card } from "semantic-ui-react"

const calcAvg = (oldAvg, count, newNum) => {
  return (oldAvg * count + newNum) / (count + 1)
}

class TeamSkills extends React.Component {
  constructor(props) {
    super(props)

    this.state = { teammates: {} }
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

  hashUsersRatings() {
    let hash = {}
    this.props.teamInfo.peopleByTeamId.nodes.forEach(person => {
      const {
        firstName,
        lastName,
        id,
        teamLead,
        ratingsByRatingFor,
        userPictureUrl
      } = person
      const key = id
      hash[key] = {
        firstName,
        lastName,
        id,
        teamLead,
        userPictureUrl,
        skills: {}
      }
      ratingsByRatingFor.nodes.forEach(ratingByAcc => {
        let { skillName, id } = ratingByAcc.skillBySkillId
        if (!hash[key].skills[skillName]) {
          hash[key].skills[skillName] = {
            id,
            avg: ratingByAcc.rating,
            ratings: [ratingByAcc.rating],
            count: 1
          }
        } else {
          hash[key].skills[skillName].avg = calcAvg(
            hash[key].skills[skillName].avg,
            hash[key].skills[skillName].count,
            ratingByAcc.rating
          )
          hash[key].skills[skillName].ratings.push(ratingByAcc.rating)
          hash[key].skills[skillName].count++
        }
      })
    })
    return hash
  }

  hashSkills = teamHash => {
    let hash = {}
    for (let person in teamHash) {
      for (let skill in teamHash[person].skills) {
        if (!hash[skill]) {
          hash[skill] = {
            id: teamHash[person].skills[skill].id,
            count: 1,
            avg: teamHash[person].skills[skill].avg,
            ratings: [
              { who: person, avgRating: teamHash[person].skills[skill].avg }
            ]
          }
        } else {
          hash[skill].avg = calcAvg(
            hash[skill].avg,
            hash[skill].count,
            teamHash[person].skills[skill].avg
          )
          hash[skill].count++
          hash[skill].ratings.push({
            who: person,
            avgRating: teamHash[person].skills[skill].avg
          })
        }
      }
    }
    return hash
  }

  renderRatings = () => {
    const teamHash = this.hashUsersRatings()
    console.log(teamHash)
    const skillHash = this.hashSkills(teamHash)
    console.log(skillHash)
    return Object.keys(skillHash).map(skill => {
      const { id, count, avg, ratings } = skillHash[skill]
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
                    rating={Math.floor(avg)}
                    icon="star"
                    disabled
                  />
                }
              >
                <Grid centered divided columns={2}>
                  <Grid.Column textAlign="center">
                    <Header as="h4">Team Average</Header>
                  </Grid.Column>
                  <Grid.Column textAlign="center">
                    <Header as="h4">Average-Rating:</Header>
                    {avg.toFixed(2)}
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
    console.log(this.props)

    return <div>{this.renderRatings()}</div>
  }
}

export default TeamSkills
