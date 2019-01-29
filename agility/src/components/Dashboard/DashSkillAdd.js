import React from "react"
import PropTypes from "prop-types"
import {
  Form,
  Button,
  Icon,
  Label,
  Search,
  Dimmer,
  Loader,
  Rating,
  Header,
  Segment
} from "semantic-ui-react"
import { graphql } from "react-apollo"
import fetchSkills from "../../queries/fetchSkills"
import _ from "lodash"
import CreateSkill from "../../mutations/CreateSkill"

const resultRenderer = ({ id, title }) => {
  return (
    <div key={id}>
      <Label content={title} />
    </div>
  )
}

resultRenderer.propTypes = {
  title: PropTypes.string
}
class DashAddSkills extends React.Component {
  constructor(props) {
    super(props)

    this.state = { skill: "", isLoading: false, results: [], addedSkills: [] }
  }

  componentWillMount() {
    this.resetComponent()
  }

  handleSkillAdd = event => {
    console.log(event.target)
    // if skill does not exist add to database
    const skillToRate = this.props.data.allSkills.nodes.find(
      skill => skill.title === this.state.skill
    )
    if (!skillToRate) {
      // createSkill mutation
      this.props
        .mutate({
          variables: {
            skillName: this.state.skill
          }
        })
        .then(res => {
          const { id, skillName } = res.data.createSkill.skill
          this.setState({
            addedSkills: [...this.state.addedSkills, { id, skillName }]
          })
        })
    } else {
      this.setState({
        addedSkills: [
          ...this.state.addedSkills,
          { id: skillToRate.id, skillName: skillToRate.title }
        ]
      })
    }

    // **TODO**
    // and pop up expressing that you've already rated this skill
    // on enter button press also trigger this?
  }

  hashSelfRatings = () => {
    const ratingsArr = this.props.ratings.nodes
    let userHash = {}
    ratingsArr.forEach(ratingByAcc => {
      let { skillName, id } = ratingByAcc.skillBySkillId
      if (ratingByAcc.ratingBy === this.props.currentUser) {
        userHash[skillName] = {
          id,
          rating: ratingByAcc.rating
        }
      }
    })
    return userHash
  }

  handleRate = (event, { rating, maxRating, skillid, skillname }) => {
    this.props.handleRate(skillid, rating)
  }

  createRatingEl = () => {
    const selfRatings = this.hashSelfRatings()
    console.log("selfRatings", selfRatings)
    const { addedSkills } = this.state

    if (addedSkills.length > 0) {
      return addedSkills.map(skill => {
        const { id, skillName } = skill
        const currUserRating = selfRatings[skillName]
          ? selfRatings[skillName].rating
          : 0
        return (
          <Segment key={id}>
            <Header dividing content={skillName} subheader="Rate Skill" />
            <Rating
              maxRating={5}
              rating={currUserRating}
              icon="star"
              onRate={this.handleRate}
              skillid={id}
              skillname={skillName}
            />
          </Segment>
        )
      })
    }
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], skill: "" })

  handleResultSelect = (e, { result }) => this.setState({ skill: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ skill: value, isLoading: true })

    setTimeout(() => {
      if (this.state.skill.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.skill), "i")
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.data.allSkills.nodes, isMatch)
      })
    }, 300)
  }

  render() {
    const { isLoading, skill, results } = this.state
    const { allSkills } = this.props.data
    if (!allSkills) {
      return (
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      )
    }
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Add Skills</label>
            <Button as="div" labelPosition="left" fluid>
              <Label basic pointing="right" style={{ width: "100%" }}>
                <Search
                  fluid
                  style={{ width: "100%" }}
                  input={{ icon: "search", iconPosition: "left" }}
                  loading={isLoading}
                  placeholder="e.g. 'JavaScript'"
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true
                  })}
                  value={skill}
                  results={results}
                  resultRenderer={resultRenderer}
                />
              </Label>
              <Button animated onClick={this.handleSkillAdd}>
                <Button.Content visible>Add</Button.Content>
                <Button.Content hidden>
                  <Icon name="add" />
                </Button.Content>
              </Button>
            </Button>
          </Form.Field>
        </Form>
        <div>{this.createRatingEl()}</div>
      </div>
    )
  }
}

export default graphql(CreateSkill)(graphql(fetchSkills)(DashAddSkills))
