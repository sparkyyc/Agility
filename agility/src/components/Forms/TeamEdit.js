import React from "react";
import {
  Button,
  Form,
  Dimmer,
  Loader,
  Message,
  Input,
  Dropdown
} from "semantic-ui-react";
import { graphql, compose } from "react-apollo";
import FetchUsers from "../../queries/fetchAllUsersWithNoTeam";
import FetchSkills from "../../queries/fetchSkills";
import CreateSkill from "../../mutations/CreateSkill";

class TeamCreateUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: this.props.selectedTeam.description,
      members: this.props.selectedTeam.peopleByTeamId.nodes.map(person => {
        return person.id;
      }),
      skills: this.props.selectedTeam.teamSkillsByTeamId.nodes.map(skill => {
        return skill.skillBySkillId.id;
      }),
      skillOptions: [],
      newMembers: [],
      removedMembers: [],
      newSkills: [],
      removedSkills: []
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.selectedTeam.title !== this.props.selectedTeam.title) {
      this.setState({
        description: nextProps.selectedTeam.description,
        members: nextProps.selectedTeam.peopleByTeamId.nodes.map(person => {
          return person.id;
        }),
        skills: nextProps.selectedTeam.teamSkillsByTeamId.nodes.map(skill => {
          return skill.skillBySkillId.id;
        }),
        skillOptions: [],
        newMembers: [],
        removedMembers: [],
        newSkills: [],
        removedSkills: []
      });
    }
    return null;
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.selectedTeam.title !== prevState.selectedTeam.title) {
  //     return {
  //       description: nextProps.selectedTeam.description,
  //       members: nextProps.selectedTeam.peopleByTeamId.nodes.map(person => {
  //         return person.id
  //       }),
  //       skills: nextProps.selectedTeam.teamSkillsByTeamId.nodes.map(skill => {
  //         return skill.skillBySkillId.id
  //       }),
  //       skillOptions: [],
  //       newMembers: [],
  //       removedMembers: [],
  //       newSkills: [],
  //       removedSkills: []
  //     }
  //   }
  //   return null
  // }

  // Team: name, description, members, skill needs
  handleAddition = (e, { value, options }) => {
    this.props
      .createSkill({
        variables: {
          skillName: value
        }
      })
      .then(res => {
        this.setState({
          skillOptions: [{ text: value, value }, ...options],
          newSkills: [...this.state.newSkills, value]
        });
      });
  };

  handleSkillChange = (e, { value }) => this.setState({ skills: value });

  handlePeopleChange = (e, { value }) => {
    this.setState({ members: value });
  };

  renderLabel = label => ({
    content: label.text,
    onRemove: () => {
      this.setState({
        members: this.state.members.filter(member => member !== label.key),
        removedMembers: [...this.state.removedMembers, label.key]
      });
    }
  });

  renderSkillLabel = label => ({
    content: label.text,
    onRemove: () => {
      this.setState({
        skills: this.state.skills.filter(skill => skill !== label.key),
        removedSkills: [...this.state.removedSkills, label.key]
      });
    }
  });

  returnDropdownItems() {
    return this.props.allPeople.allPeople.nodes.map(person => {
      return {
        key: person.id,
        text: `${person.firstName} ${person.lastName}`,
        value: person.id,
        description: person.position,
        image: person.userPictureUrl,
        onClick: (event, data) => {
          this.setState({
            members: [...this.state.members, data.value],
            newMembers: [...this.state.newMembers, data.value]
          });
        }
      };
    });
  }

  returnSkillDropdownItems() {
    return this.props.allSkills.allSkills.nodes.map(skill => {
      return {
        key: skill.id,
        text: skill.title,
        value: skill.id,
        onClick: (event, data) => {
          this.setState({
            skills: [...this.state.skills, data.value],
            newSkills: [...this.state.newSkills, data.value]
          });
        }
      };
    });
  }

  render() {
    if (this.props.allSkills.loading || this.props.allPeople.loading) {
      return (
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      );
    }
    // const skillsArr = this.props.allSkills.allSkills.nodes
    // let skillsOptions = skillsArr.map(skill => {
    //   return {
    //     key: skill.id,
    //     text: skill.title,
    //     value: skill.title
    //   }
    // })
    // if (this.state.skillOptions.length > 0) {
    //   skillsOptions = this.state.skillOptions
    // }
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field
          control={Input}
          label="Description"
          placeholder="Frontend team focused on buttons only. "
          value={this.state.description}
          onChange={e => this.setState({ description: e.target.value })}
        />
        <Form.Field>
          <label>Add Team Members</label>
          <Dropdown
            placeholder="People"
            fluid
            multiple
            selection
            search
            // onChange={this.handlePeopleChange}
            renderLabel={this.renderLabel}
            value={this.state.members}
            options={this.returnDropdownItems()}
          />
        </Form.Field>
        <Form.Field>
          <label>Skills wanted for team</label>
          <Dropdown
            placeholder="Skills"
            fluid
            multiple
            selection
            search
            allowAdditions
            value={this.state.skills}
            options={this.returnSkillDropdownItems()}
            onAddItem={this.handleAddition}
            // onChange={this.handleSkillChange}
            renderLabel={this.renderSkillLabel}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default compose(
  graphql(FetchSkills, { name: "allSkills" }),
  graphql(FetchUsers, { name: "allPeople" }),
  graphql(CreateSkill, { name: "createSkill" })
)(TeamCreateUpdate);
