import React from "react"
import { Button, Form, Message } from "semantic-ui-react"

class AuthForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = { email: "", password: "" }
  }

  renderErrors = () => {
    return this.props.errors.map(error => {
      return <Message key={error} error header="Oops!" content={error} />
    })
  }

  onSubmit(event) {
    event.preventDefault()

    this.props.onSubmit(this.state)
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit.bind(this)}>
        <Form.Input
          label="Email"
          placeholder="harry@hogwarts.com"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <Form.Input
          label="Password"
          placeholder="hermioneisbae123"
          type="password"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
        />
        {this.renderErrors()}
        <Button>Submit</Button>
      </Form>
    )
  }
}

export default AuthForm
