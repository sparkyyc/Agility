import PropTypes from "prop-types"
import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Table
} from "semantic-ui-react"
import logo from "../../assets/logo.png"
import Pie from "./PieRatings"

const URL = "http://localhost:3000/"

const getWidth = () => {
  const isSSR = typeof window === "undefined"

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const HomepageHeading = ({ mobile, getStartedClick }) => (
  <Container text>
    <Image
      src={logo}
      size="medium"
      circular
      centered
      style={{ opacity: 0.85, marginTop: mobile ? "5%" : 0 }}
    />
    <Header
      as="h1"
      content="Agility"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0
        // marginTop: mobile ? "1.5em" : "3em"
      }}
    />
    <Header
      as="h2"
      content="Optimize your teams with agile skill mapping."
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em",
        marginBottom: "4%"
      }}
    />
    <Button
      size="huge"
      style={{ backgroundColor: "#DC477A", color: "white" }}
      onClick={getStartedClick}
    >
      Get Started
      <Icon name="right arrow" />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
}

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  onStartClick = () => {
    this.props.history.push(`/signup/`)
  }

  render() {
    const { children } = this.props
    const { fixed } = this.state
    console.log(this.props)
    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            // inverted
            textAlign="center"
            style={{
              minHeight: 700,
              padding: "1em 0em",
              background: "linear-gradient(to right, #77a1d3, #79cbca, #e684ae)"
            }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              //   inverted={!fixed}
              //   pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item position="right">
                  <Button
                    onClick={() => this.props.history.push(`/login/`)}
                    basic
                    inverted={!fixed}
                    // color="white"
                  >
                    Log in
                  </Button>
                  <Button
                    // as="a"
                    onClick={() => this.props.history.push(`/signup/`)}
                    inverted={!fixed}
                    // color="white"
                    basic
                    primary={fixed}
                    style={{ marginLeft: "0.5em" }}
                  >
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading getStartedClick={this.onStartClick} />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  onStartClick = () => {
    this.props.history.push(`/signup/`)
  }

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as="a">Log in</Menu.Item>
          <Menu.Item as="a">Sign Up</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            // inverted
            textAlign="center"
            style={{
              minHeight: 350,
              padding: "1em 0em",
              background: "linear-gradient(to right, #77a1d3, #79cbca, #e684ae)"
            }}
            vertical
          >
            <Container>
              <Menu inverted secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <Button
                    as="a"
                    inverted
                    onClick={() => this.props.history.push(`/login/`)}
                  >
                    Log in
                  </Button>
                  <Button
                    as="a"
                    inverted
                    style={{ marginLeft: "0.5em" }}
                    onClick={() => this.props.history.push(`/signup/`)}
                  >
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile getStartedClick={this.onStartClick} />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
}

const ResponsiveContainer = ({ children, history }) => (
  <div>
    <DesktopContainer history={history}>{children}</DesktopContainer>
    <MobileContainer history={history}>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node
}

const HomepageLayout = props => (
  <ResponsiveContainer history={props.history}>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Collaboration Is Key
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Collaboration works best when everyone has at least a basic level
              of skill in all competencies needed by the team. This tool
              stresses the cooperative, relational nature of skill levels. We
              use these skill levels as a map for individuals looking for
              mentors for a particular skill, and encourage teams to raise their
              overall proficiency together across a broad set of skills.
            </p>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Enable Your Team
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              In the absence of a broadening skill set, people tend to
              specialize, and may become isolated, bottlenecks, or points of
              failure for the continued development/support of the software. We
              encourage continued learning to avoid these pitfalls.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={8}>
            <Pie />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center" />
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: "2em" }}>
          Self & Peer Evaluations
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Via Self and Peer rating systems we recognize rating conflicts,
          prompting re-evaluation. This process promotes individual and team
          collaberation, leading to a greater understanding of the skill levels
          of each individual and team as a whole.
        </p>
        {/* <Button as="a" size="large">
          Read More
        </Button> */}
        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: "3em 0em", textTransform: "uppercase" }}
        >
          <p>Rating System</p>
        </Divider>
        <Header as="h3" style={{ fontSize: "2em" }}>
          Our Evaluation System
        </Header>
        <Table color="pink">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Value</Table.HeaderCell>
              <Table.HeaderCell>Symbol</Table.HeaderCell>
              <Table.HeaderCell>Level</Table.HeaderCell>
              <Table.HeaderCell>Criteria</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign="center">0</Table.Cell>
              <Table.Cell textAlign="center">
                <Icon name="chart pie" />
              </Table.Cell>
              <Table.Cell>Questioning</Table.Cell>
              <Table.Cell>
                Not sure what the skill is, or why/when it would be needed.
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign="center">1</Table.Cell>
              <Table.Cell textAlign="center">
                <Icon name="chart pie" />
              </Table.Cell>
              <Table.Cell>Learning</Table.Cell>
              <Table.Cell>
                know what the skill is, no first-hand experience
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign="center">2</Table.Cell>
              <Table.Cell textAlign="center">
                <Icon name="chart pie" />
              </Table.Cell>
              <Table.Cell>Practicing</Table.Cell>
              <Table.Cell>
                actively using a skill at home, in a class or work environment;
                you're here if you can reference more than one resource that
                you've used to learn about this skill AND if you've used this in
                the last 30 days
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign="center">3</Table.Cell>
              <Table.Cell textAlign="center">
                <Icon name="chart pie" />
              </Table.Cell>
              <Table.Cell>Journeying</Table.Cell>
              <Table.Cell>
                has used the skill in multiple environments, at least one of
                which is work; peers recognize this person's competence; you're
                here if peers from two different environments can vouch for you
                AND you are practicing
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign="center">4</Table.Cell>
              <Table.Cell textAlign="center">
                <Icon name="chart pie" />
              </Table.Cell>
              <Table.Cell>Mastering</Table.Cell>
              <Table.Cell>
                unquestioned competence in a skill, can explain underlying
                forces to others; you've practiced this skill along side other
                experts AND you are journeying
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    </Segment>
    <Segment
      inverted
      vertical
      style={{
        padding: "5em 0em",
        background: "linear-gradient(to right, #77a1d3, #79cbca, #e684ae)"
      }}
    >
      <Container>
        {/* <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">Sitemap</List.Item>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">Religious Ceremonies</List.Item>
                <List.Item as="a">Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">Banana Pre-Order</List.Item>
                <List.Item as="a">DNA FAQ</List.Item>
                <List.Item as="a">How To Access</List.Item>
                <List.Item as="a">Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}> */}
        <p>Site by: Christa Sparks</p>
        {/* </Grid.Column>
          </Grid.Row>
        </Grid> */}
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default withRouter(HomepageLayout)
