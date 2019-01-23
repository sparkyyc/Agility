import React from 'react'
import { Rating, Header } from 'semantic-ui-react'

class DashRatings extends React.Component {

    constructor(props){
        super(props)

        this.state= { skills: {} }
    }

    componentDidMount(){
        this.setState({ skills: this.hashRatings() })
    }

  hashRatings() {
      const ratingsArr = this.props.ratings.nodes
      let hash = {}
      ratingsArr.forEach(ratingByAcc => {
          let { skillName } = ratingByAcc.skillBySkillId
        if(!hash[skillName]) {
            hash[skillName] = { 
                ratings: [ratingByAcc.rating],
                count: 1
            }
        } else {
            hash[skillName].ratings.push(ratingByAcc.rating)
            hash[skillName].count++
        }
      })
    return hash
  }

  renderRatings(){
    // <Rating maxRating={5} onRate={this.handleRate} />
    // <pre>{JSON.stringify(this.state, null, 2)}</pre>
        return Object.keys(this.state.skills).map(skill => {
            const { ratings, count } = this.state.skills[skill] 
            const averageRating = ratings.reduce((acc, currVal) => acc + currVal) / count
        return(
            <div key={skill} >
                <Header>{skill}</Header>
                {/* **TODO** on hover show non-rounded down rating */}
                <Rating maxRating={5} defaultRating={Math.floor(averageRating)} />
            </div>
        )
    })
  }

  // handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating })

    render(){
        console.log(this.state)
        return (
            <div>
                {this.renderRatings()}
            </div>
        )
    }
}

export default DashRatings