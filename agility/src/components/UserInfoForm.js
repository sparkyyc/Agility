import React from "react"
import { Button, Form, Dimmer, Loader, Select } from "semantic-ui-react"
import { graphql } from "react-apollo"
import FetchTeams from "../queries/fetchTeams"

class UserInfoForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fristName: "",
      lastName: "",
      pic: "",
      position: "",
      team: "",
      teamLead: false
    }
  }

  onSubmit(event) {
    event.preventDefault()
    console.log(this.state)
  }

  handleChange = (e, data) => {
    console.log(data.value)
    this.setState({ team: data.value })
  }

  render() {
    if (this.props.data.loading) {
      return (
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      )
    }
    const options = this.props.data.allTeams.nodes.map(team => {
      return {
        ...team,
        text: team.name
      }
    })
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Input
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
        <Form.Input
          label="Profile Picture URL"
          placeholder="www.pictureofme.com"
          value={this.state.pic}
          onChange={e => this.setState({ pic: e.target.value })}
        />
        <Form.Input
          label="Job Title"
          placeholder="Junior Front-End Engineer"
          value={this.state.position}
          onChange={e => this.setState({ position: e.target.value })}
        />
        <Form.Field
          control={Select}
          options={options}
          placeholder="Teams"
          value={this.state.team}
          onClick={this.handleChange}
        />
        <Form.Checkbox
          label="I am a Team Lead with Admin Privileges"
          value={this.state.teamLead}
          onChange={e => this.setState({ teamLead: e.target.value })}
        />
        <Button type="submit">Submit</Button>
      </Form>
    )
  }
}

export default graphql(FetchTeams)(UserInfoForm)
