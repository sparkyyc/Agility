import React from 'react'
import { graphql } from 'react-apollo'
import FetchUser from '../queries/fetchUser'
import { Image, Header, Grid, Dimmer, Loader } from 'semantic-ui-react'
import PersonRatings from './PersonRatings'
import PersonSkillAdd from './PersonSkillAdd'


class PersonDetails extends React.Component{


    render(){
        if(this.props.data.loading){
            return (
                    <Dimmer active inverted>
                        <Loader content='Loading' />
                    </Dimmer> 
            )
        }
        const {
            id,
            firstName,
            lastName,
            userPictureUrl,
            position,
            ratingsByRatingFor
          } = this.props.data.personById;
      
          return (
            <div className="dashOverview" >
              <div className="userInfo" >
                <Image className="userPic" src={userPictureUrl} size="small" rounded/>
                <div className="userDetails" >
                  <Header size="large" dividing>
                      {firstName} {lastName}
                  </Header>
                {position}
                </div>
              </div>
              <div>
                <Grid columns={2} divided>
                  <Grid.Column>
                      <PersonRatings ratings={ratingsByRatingFor} userId={id} handleRate={this.props.handleRate} />
                  </Grid.Column>
                  <Grid.Column>
                      <PersonSkillAdd ratings={ratingsByRatingFor} userId={id} handleRate={this.props.handleRate} />
                  </Grid.Column>
                </Grid>
              </div>
            </div>
          )
    }
}

export default graphql(FetchUser, {
    options: (props) => { return { variables: { id: parseInt(props.match.params.id) } } }
})(PersonDetails)