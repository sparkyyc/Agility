import React from "react"
import {
  Rating,
  Header,
  Popup,
  Grid,
  Card,
  Feed,
  Divider,
  Icon,
  Image
} from "semantic-ui-react"
import { withRouter } from "react-router-dom"
import symbol0 from "../../assets/skill_0.png"
import symbol1 from "../../assets/skill_1.png"
import symbol2 from "../../assets/skill_2.png"
import symbol3 from "../../assets/skill_3.png"
import symbol4 from "../../assets/skill_4.png"

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

  renderFeedOfRatings = (teamHash, skill) => {
    return Object.keys(teamHash).map(person => {
      if (teamHash[person].skills[skill]) {
        const {
          firstName,
          lastName,
          id,
          teamLead,
          userPictureUrl,
          skills
        } = teamHash[person]
        return (
          <Feed.Event key={id}>
            <Feed.Label>{this.renderSymbol(skills[skill].avg)}</Feed.Label>
            <Feed.Content>
              <Feed.Summary>
                <a onClick={() => this.props.history.push(`/dashboard/${id}`)}>
                  {firstName} {lastName}
                </a>{" "}
                has a {skills[skill].avg} in {skill}
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        )
      }
    })
  }

  renderRatings = () => {
    const teamHash = this.hashUsersRatings()
    const skillHash = this.hashSkills(teamHash)
    return Object.keys(skillHash).map(skill => {
      const { id, count, avg, ratings } = skillHash[skill]
      return (
        <Card key={id} color={this.randomColor()}>
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
                    {this.renderSymbol(avg)}
                  </Grid.Column>
                  <Grid.Column textAlign="center">
                    <Header as="h4">Average-Rating:</Header>
                    {avg.toFixed(2)}
                  </Grid.Column>
                </Grid>
              </Popup>
            </Card.Description>
            <Divider />
            <Feed>{this.renderFeedOfRatings(teamHash, skill)}</Feed>
          </Card.Content>
        </Card>
      )
    })
  }

  render() {
    return <div>{this.renderRatings()}</div>
  }
}

export default withRouter(TeamSkills)
