import React from "react"
import {
  Button,
  Form,
  Message,
  Grid,
  Header,
  Image,
  Segment
} from "semantic-ui-react"
import logo from "../../assets/logo.png"

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
    console.log(this.props)
    const header =
      this.props.type === "login"
        ? "Login to your account"
        : "Sign up for an account"
    const message =
      this.props.type === "login" ? (
        <Message>
          New to us? <a href="/signup/">Sign Up</a>
        </Message>
      ) : (
        <Message>
          Already have an account? <a href="/login">Login</a>
        </Message>
      )
    return (
      <div className="login-form">
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Image src={logo} size="small" circular /> {header}
            </Header>
            <Form size="large" onSubmit={this.onSubmit.bind(this)}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  label="Email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  label="Password"
                  placeholder="password"
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
                {this.renderErrors()}
                <Button color="teal" fluid size="large">
                  Submit
                </Button>
              </Segment>
              {message}
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default AuthForm
