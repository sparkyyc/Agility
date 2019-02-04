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
                Before one decides to invest in learning a new skill, it is natural to be skeptical, to evaluate the potential benefits before investigating.  Someone who is  questioning change should be engaged and an attempt to understand the skill being questioned.
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign="center">1</Table.Cell>
              <Table.Cell textAlign="center">
                <Icon name="chart pie" />
              </Table.Cell>
              <Table.Cell>Learning</Table.Cell>
              <Table.Cell>
                Individuals who have been exposed to a skill, but do not yet have first-hand experience with it, are Learning.  They may continue learning through reading or conversation, through a formal class or casual presentation at a local user's group.
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign="center">2</Table.Cell>
              <Table.Cell textAlign="center">
                <Icon name="chart pie" />
              </Table.Cell>
              <Table.Cell>Practicing</Table.Cell>
              <Table.Cell>
                At this level, one has advanced beyond abstract learning and is now practicing the skill in a ‘safe’ environment.  They may be taking a course with hands-on exercises, recreating examples from a book, or doing work under the supervision of a more skilled team member.  Practicing represents the first big step from abstract to concrete.  A wise organization will not let someone Practice on their own.  Someone who is Practicing does not yet know what they do not know, and therefore cannot judge the limits of safely applying their skills.  Further improvement comes as individuals seek advice and feedback from mentors in the Agile community.
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign="center">3</Table.Cell>
              <Table.Cell textAlign="center">
                <Icon name="chart pie" />
              </Table.Cell>
              <Table.Cell>Journeying</Table.Cell>
              <Table.Cell>
                An individual who is experimenting with the application of a particular skill in various contexts is Journeying.  This person has already practiced the skill in at least two different environments (two clients, two employers, or work and class), and peers would consider this person as competent and knowledgeable in the specific skill.  They can work on their own, or to increase the competence of a team.  A Team member of a lower skill level will learn from them, a team member of a higher skill level will recognize their expertise and practical knowledge.

One cannot be taught the spirit of Journeying--one must simply thirst for improvement.  Regardless of the skill category, one must constantly practice current techniques, seek out new and better ones, and share the skill with team mates, to keep Journeying.

This is not all.  One who is Journeying supports developments in the skill, by trying and validating new ideas that could potentially improve the state of the art--that is, they welcome people who are Contributing, whether these ideas come from people have become experts at the craft or not.
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell textAlign="center">4</Table.Cell>
              <Table.Cell textAlign="center">
                <Icon name="chart pie" />
              </Table.Cell>
              <Table.Cell>Mastering</Table.Cell>
              <Table.Cell>
                Someone who is Mastering a skill continues Journeying, Practicing, and Learning--but this person also possesses unquestioned competence in the particular skill.  They know it cold; it is second nature to them.  The person can intuit the limits of applying the skill, and can foresee new applications in new environments.

But, it does not stop there.  Mastering includes bringing up the skill level of one's team mates.  They do this in several ways. 

They serve as an example of proper practice.  If you want to know how it is done, observe this expert.

They partner with other team members and actively share their knowledge and experience.

They seek out teachable moments.  When asked a question, they prefer to engage in a dialog that will lead the questioner to an answer, rather than making a pronouncement.
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
