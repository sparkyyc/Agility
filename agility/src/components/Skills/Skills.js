import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Grid, Header } from 'semantic-ui-react'

import SkillList from './SkillList'
import SkillDetail from './SkillDetail'

import fetchSkills from '../../queries/fetchSkills'

class Skills extends Component {
  state = {
    activeSkill: null
  }

  setActiveSkill(skill) {
    this.setState({ activeSkill: skill })
  }

  render() {
    const { allSkills } = this.props.data

    return (
      <div>
        <Grid columns={2} divided>
          <Grid.Column width={5}>
            <Header size="large">Skill Catalog</Header>
            <SkillList skills={allSkills} setActiveSkill={this.setActiveSkill.bind(this)} />
          </Grid.Column>
          <Grid.Column>
            <SkillDetail skill={this.state.activeSkill} />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default graphql(fetchSkills)(Skills)
