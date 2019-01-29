import React from "react"
import { graphql } from "react-apollo"
import { Dimmer, Loader } from "semantic-ui-react"
import UserInfoForm from "./UserInfoForm"
import FetchUser from "../queries/fetchUser"

class EditForm extends React.Component {
  render() {
    if (this.props.data.loading) {
      return (
        <Dimmer active inverted>
          <Loader content="Loading" />
        </Dimmer>
      )
    }
    return (
      <div>
        <UserInfoForm
          userInfo={this.props.data.personById}
          userId={this.props.currentUser.id}
        />
      </div>
    )
  }
}

export default graphql(FetchUser, {
  options: props => {
    return { variables: { id: parseInt(props.currentUser.id) } }
  }
})(EditForm)
