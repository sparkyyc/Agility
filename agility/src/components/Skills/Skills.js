import React, { Component } from "react"
import { graphql, compose } from "react-apollo"
import { Grid, Header } from "semantic-ui-react"

import SkillList from "./SkillList"
import SkillDetail from "./SkillDetail"
import SkillAdmin from "./SkillAdmin"

import fetchSkills from "../../queries/fetchSkills"
import FetchPillars from "../../queries/FetchPillars"

class Skills extends Component {
  state = {
    activeSkill: null
  }

  setActiveSkill(skill) {
    console.log(skill)
    this.setState({ activeSkill: skill })
  }

  renderIfAdmin() {
    if (this.props.currentUser.teamLead && this.state.activeSkill) {
      return (
        <SkillAdmin
          skill={this.state.activeSkill}
          pillars={this.props.fetchPillars.allPillars}
          setActiveSkill={this.setActiveSkill.bind(this)}
        />
      )
    } else {
      return <SkillDetail skill={this.state.activeSkill} />
    }
  }

  render() {
    const { allSkills } = this.props.fetchSkills
    console.log(this.props)
    return (
      <div>
        <Grid columns={2} divided>
          <Grid.Column width={5}>
            <Header size="large">Skill Catalog</Header>
            <SkillList
              skills={allSkills}
              setActiveSkill={this.setActiveSkill.bind(this)}
            />
          </Grid.Column>
          <Grid.Column>{this.renderIfAdmin()}</Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default compose(
  graphql(FetchPillars, { name: "fetchPillars" }),
  graphql(fetchSkills, { name: "fetchSkills" })
)(Skills)
