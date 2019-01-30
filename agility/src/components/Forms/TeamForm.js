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
import { graphql } from "react-apollo"
import _ from "lodash"
import FetchTeams from "../../queries/fetchTeamsAsTitle"
import TeamCreateEdit from "./TeamCreateEdit"

const resultRenderer = ({ id, title }) => {
  console.log(id, title)
  return (
    <div key={id}>
      <Label content={title} />
    </div>
  )
}

resultRenderer.propTypes = {
  title: PropTypes.string
}

class TeamForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = { value: "", valueId: null, isLoading: false, results: [] }
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ value, isLoading: true })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), "i")
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.data.allTeams.nodes, isMatch)
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state
    console.log(this.props)
    return (
      <div>
        <Form>
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
              onChange={this.handleSkillChange}
            />
          </Form.Field>
        </Form>
        <TeamCreateEdit />
      </div>
    )
  }
}

export default graphql(FetchTeams)(TeamForm)
