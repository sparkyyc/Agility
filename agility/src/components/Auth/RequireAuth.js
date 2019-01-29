import React from "react"
import { graphql } from "react-apollo"
import currentUserQuery from "../../queries/currentUser"
import { withRouter } from "react-router-dom"

export default WrappedComponenet => {
  class RequireAuth extends React.Component {
    componentWillUpdate(nextProps) {
      if (!nextProps.data.loading && !nextProps.data.currentUser) {
        this.props.history.push(`/splash/`)
      }
    }

    render() {
      if(this.props.data.loading){
        return <div>Loading</div>
      }
      return (
        <WrappedComponenet
          currentUser={this.props.data.currentUser}
          {...this.props}
        />
      )
    }
  }

  return withRouter(graphql(currentUserQuery)(RequireAuth))
}
