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
  Segment,
  Dropdown
} from "semantic-ui-react"
import { graphql, ApolloConsumer, compose } from "react-apollo"
import _ from "lodash"
import FetchTeams from "../../queries/fetchTeamsAsTitle"
import UpdatePersonById from "../../mutations/UpdatePersonById"
import CreateTeam from "../../mutations/CreateTeam"
import CreateTeamSkill from "../../mutations/CreateTeamSkill"
import UpdateTeamById from "../../mutations/UpdateTeamById"
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

  onSubmit = (description, members, skills) => {
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
          skills.forEach(skill => {
            this.props.createTeamSkill({
              variables: { teamId: res.team.id, skillId: skill.id }
            })
          })
        })
    } else {
      // if team exists update desc
      this.props.updateTeam({
        variables: { id: this.state.existingTeam.id, description }
      })
      // update each person picked for team
      // only update new additions/remove

      // create team skill association
      // only add new skills
    }
  }

  renderEditOrCreate() {
    if (this.state.existingTeam) {
      return <TeamEdit selectedTeam={this.state.existingTeam} />
    } else {
      return <TeamCreate />
    }
  }

  render() {
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
      <div>
        <Form>
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
        {/* todo pass existing team as argument */}
        {this.renderEditOrCreate()}
      </div>
    )
  }
}

export default compose(
  graphql(FetchTeams, { name: "allTeams" }),
  graphql(CreateTeam, { name: "createTeam" }),
  graphql(UpdatePersonById, { name: "updatePerson" }),
  graphql(CreateTeamSkill, { name: "createTeamSkill" }),
  graphql(UpdateTeamById, { name: "updateTeam" })
)(TeamForm)
