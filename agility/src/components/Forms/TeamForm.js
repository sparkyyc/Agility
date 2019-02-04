import React from "react"
import PropTypes from "prop-types"
import {
  Form,
  Grid,
  Icon,
  Label,
  Search,
  Dimmer,
  Loader,
  Rating,
  Header,
  Segment,
  Dropdown
} from "semantic-ui-react"
import { graphql, compose } from "react-apollo"
import { withRouter } from "react-router-dom"
import _ from "lodash"
import FetchTeams from "../../queries/fetchTeamsAsTitle"
import UpdatePersonById from "../../mutations/UpdatePersonById"
import CreateTeam from "../../mutations/CreateTeam"
import CreateTeamSkill from "../../mutations/CreateTeamSkill"
import UpdateTeamById from "../../mutations/UpdateTeamById"
import DeleteTeamSkill from "../../mutations/DeleteTeamSkill"
import TeamCreate from "./TeamCreate"
import TeamEdit from "./TeamEdit"

class TeamForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      teamOptions: [],
      teamName: "",
      existingTeam: null
    }
  }

  handleAddition = (e, { value, options }) => {
    this.setState({
      teamOptions: [{ text: value, value }, ...options]
    })
  }

  handleTeamChange = (e, { value }) => {
    const team = this.props.allTeams.allTeams.nodes.find(team => {
      return team.title === value
    })
    if (team) {
      // if team exists(update) retrieve data and fill
      this.setState({ existingTeam: team, teamName: value })
    } else {
      this.setState({
        teamName: value,
        existingTeam: null
      })
    }
    // if team doesn't exist clear fields?
  }

  onSubmit = (
    description,
    members,
    skills,
    newMembers,
    removedMembers,
    newSkills,
    removedSkills
  ) => {
    // if team does not exist create team
    if (!this.state.existingTeam) {
      this.props
        .createTeam({
          variables: { name: this.state.teamName, description }
        })
        .then(res => {
          // update each person picked for team
          members.forEach(member => {
            this.props.updatePerson({
              variables: { id: member.id, teamId: res.team.id }
            })
          })
          // create team skill association
          skills
            .forEach(skill => {
              this.props.createTeamSkill({
                variables: { teamId: res.team.id, skillId: skill.id }
              })
            })
            .then(() => {
              this.props.history.push(`/team/${res.team.id}`)
            })
        })
    } else {
      // if team exists update desc
      this.props.updateTeam({
        variables: { id: this.state.existingTeam.id, description }
      })
      // // update each person picked for team
      // // only update new additions/remove
      const membersToAdd = newMembers.filter(el => !removedMembers.includes(el))
      const membersToRemove = this.state.existingTeam.peopleByTeamId.nodes.filter(
        el => removedMembers.includes(el.id)
      )
      membersToAdd.forEach(member => {
        this.props.updatePerson({
          variables: { id: member, teamId: this.state.existingTeam.id }
        })
      })
      membersToRemove.forEach(member => {
        this.props.updatePerson({
          variables: { id: member.id, teamId: null }
        })
      })
      // create team skill association
      // only add new skills
      const skillsToAdd = newSkills.filter(el => !removedSkills.includes(el))
      const skillsToRemove = this.state.existingTeam.teamSkillsByTeamId.nodes.filter(
        el => removedSkills.includes(el.skillBySkillId.id)
      )
      skillsToAdd.forEach(skill => {
        this.props.createTeamSkill({
          variables: { teamId: this.state.existingTeam.id, skillId: skill }
        })
      })
      skillsToRemove.forEach(skill => {
        this.props.deleteTeamSkill({
          variables: { id: skill.id }
        })
      })
      this.props.history.push(`/team/${this.state.existingTeam.id}`)
    }
  }

  renderEditOrCreate() {
    if (this.state.existingTeam) {
      return (
        <TeamEdit
          selectedTeam={this.state.existingTeam}
          onSubmit={this.onSubmit}
        />
      )
    } else {
      return <TeamCreate onSubmit={this.onSubmit} />
    }
  }

  render() {
    console.log(this.state)

    if (this.props.allTeams.loading) {
      return (
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      )
    }
    const teamArr = this.props.allTeams.allTeams.nodes
    let teamOptions = teamArr.map(team => {
      return {
        key: team.id,
        text: team.title,
        value: team.title
      }
    })
    if (this.state.teamOptions.length > 0) {
      teamOptions = this.state.teamOptions
    }
    return (
      <Grid columns={3}>
        <Grid.Column width={4} />
        <Grid.Column width={8}>
          <Form style={{ marginBottom: "10px" }}>
            <div>
              <Form.Field>
                <label>Search for existing team or create a new team</label>
                <Dropdown
                  placeholder="Team Name"
                  fluid
                  selection
                  search
                  allowAdditions
                  value={this.state.teamName}
                  options={teamOptions}
                  onAddItem={this.handleAddition}
                  onChange={this.handleTeamChange}
                />
              </Form.Field>
            </div>
          </Form>
          {this.renderEditOrCreate()}
        </Grid.Column>
      </Grid>
    )
  }
}

export default withRouter(
  compose(
    graphql(FetchTeams, { name: "allTeams" }),
    graphql(CreateTeam, { name: "createTeam" }),
    graphql(UpdatePersonById, { name: "updatePerson" }),
    graphql(CreateTeamSkill, { name: "createTeamSkill" }),
    graphql(UpdateTeamById, { name: "updateTeam" }),
    graphql(DeleteTeamSkill, { name: "deleteTeamSkill" })
  )(TeamForm)
)
