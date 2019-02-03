import React from "react"
import {
  Button,
  Form,
  Dimmer,
  Loader,
  Message,
  Input,
  Dropdown
} from "semantic-ui-react"
import { graphql, compose } from "react-apollo"
import FetchUsers from "../../queries/fetchAllUsersWithNoTeam"
import FetchSkills from "../../queries/fetchSkills"
import CreateSkill from "../../mutations/CreateSkill"

class TeamCreateUpdate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      description: "",
      members: [],
      skills: [],
      skillOptions: []
    }
  }

  // Team: name, description, members, skill needs
  handleAddition = (e, { value, options }) => {
    this.props
      .createSkill({
        variables: {
          skillName: value
        }
      })
      .then(res => {
        this.setState({
          skillOptions: [{ text: value, value }, ...options]
        })
      })
  }

  handleSkillChange = (e, { value }) => this.setState({ skills: value })

  handlePeopleChange = (e, { value }) => this.setState({ members: value })

  onSubmit = event => {
    event.preventDefault()
    const { description, members, skills } = this.state
    this.props.onSubmit(description, members, skills)
  }

  render() {
    if (this.props.allSkills.loading || this.props.allPeople.loading) {
      return (
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      )
    }
    const peopleArr = this.props.allPeople.allPeople.nodes
    const peopleOptions = peopleArr.map(person => {
      return {
        key: person.id,
        text: `${person.firstName} ${person.lastName}`,
        value: person.id,
        description: person.position,
        image: person.userPictureUrl
      }
    })
    const skillsArr = this.props.allSkills.allSkills.nodes
    let skillsOptions = skillsArr.map(skill => {
      return {
        key: skill.id,
        text: skill.title,
        value: skill.title
      }
    })
    if (this.state.skillOptions.length > 0) {
      skillsOptions = this.state.skillOptions
    }
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field
          control={Input}
          label="Description"
          placeholder="Frontend team focused on buttons only. "
          value={this.state.description}
          onChange={e => this.setState({ description: e.target.value })}
        />
        <Form.Field>
          <label>Add Team Members</label>
          <Dropdown
            placeholder="People"
            fluid
            multiple
            selection
            search
            value={this.state.members}
            onChange={this.handlePeopleChange}
            options={peopleOptions}
          />
        </Form.Field>
        <Form.Field>
          <label>Skills wanted for team</label>
          <Dropdown
            placeholder="Skills"
            fluid
            multiple
            selection
            search
            allowAdditions
            value={this.state.skills}
            options={skillsOptions}
            onAddItem={this.handleAddition}
            onChange={this.handleSkillChange}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    )
  }
}

export default compose(
  graphql(FetchSkills, { name: "allSkills" }),
  graphql(FetchUsers, { name: "allPeople" }),
  graphql(CreateSkill, { name: "createSkill" })
)(TeamCreateUpdate)
