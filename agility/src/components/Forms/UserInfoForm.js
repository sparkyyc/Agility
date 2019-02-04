import React from "react"
import { Button, Form, Dimmer, Loader, Message, Input } from "semantic-ui-react"
import { graphql, compose } from "react-apollo"
import { withRouter } from "react-router-dom"

import FetchTeams from "../../queries/fetchTeams"
import UpdatePersonById from "../../mutations/UpdatePersonById"

class UserInfoForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: this.props.userInfo.firstName,
      lastName: this.props.userInfo.lastName,
      // pic: this.props.userInfo.userPictureUrl,
      position: this.props.userInfo.position,
      team: this.props.userInfo.teamId,
      teamLead: this.props.userInfo.teamLead,
      errors: []
    }
  }

  onSubmit = event => {
    event.preventDefault()
    const { firstName, lastName, position, team, teamLead } = this.state
    this.props
      .mutate({
        variables: {
          id: this.props.userId,
          firstName,
          lastName,
          // userPictureUrl: pic,
          position,
          teamId: team,
          teamLead
        }
      })
      .then(() => {
        this.props.history.push(`/dashboard/${this.props.userId}`)
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message)
        this.setState({ errors })
      })
  }

  handleChange = (e, data) => {
    this.setState({ team: data.value })
  }

  toggle = () => this.setState({ teamLead: !this.state.teamLead })

  renderErrors = () => {
    return this.state.errors.map(error => {
      return <Message key={error} error header="Oops!" content={error} />
    })
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
    const options = this.props.allTeams.allTeams.nodes.map(team => {
      return {
        ...team,
        text: team.name,
        value: team.id
      }
    })
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field
          control={Input}
          label="First Name"
          placeholder="First Name"
          value={this.state.firstName}
          onChange={e => this.setState({ firstName: e.target.value })}
        />
        <Form.Input
          label="Last Name"
          placeholder="Last Name"
          value={this.state.lastName}
          onChange={e => this.setState({ lastName: e.target.value })}
        />
        {/* <Form.Input
          label="Profile Picture URL"
          placeholder="www.pictureofme.com"
          value={this.state.pic}
          onChange={e => this.setState({ pic: e.target.value })}
        /> */}
        <Form.Input
          label="Job Title"
          placeholder="Junior Front-End Engineer"
          value={this.state.position}
          onChange={e => this.setState({ position: e.target.value })}
        />
        <Form.Select
          options={options}
          placeholder="Teams"
          value={this.state.team}
          onChange={this.handleChange}
        />
        <Form.Checkbox
          label="I am a Team Lead with Admin Privileges"
          onChange={this.toggle}
          checked={this.state.teamLead}
        />
        {this.renderErrors()}
        <Button type="submit">Submit</Button>
      </Form>
    )
  }
}

export default withRouter(
  compose(
    graphql(UpdatePersonById),
    graphql(FetchTeams, { name: "allTeams" })
  )(UserInfoForm)
)
