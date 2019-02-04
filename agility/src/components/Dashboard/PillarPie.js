import React from "react"
import { render } from "react-dom"
import { ResponsivePie } from "@nivo/pie"
import { linearGradientDef } from "@nivo/core"
import { Label } from "semantic-ui-react"

// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.

// const data = [
//   {
//     id: "Product Sense",
//     label: "Product Sense",
//     value: 20,
//     color: "hsl(271, 70%, 50%)"
//   },
//   {
//     id: "Collaboration",
//     label: "Collaboration",
//     value: 20,
//     color: "hsl(152, 70%, 50%)"
//   },
//   {
//     id: "Focus on Business Value",
//     label: "Focus on Business Value",
//     value: 0,
//     color: "hsl(300, 70%, 50%)"
//   },
//   {
//     id: "Supportive Culture",
//     label: "Supportive Culture",
//     value: 10,
//     color: "hsl(352, 70%, 50%)"
//   },
//   {
//     id: "Confidence",
//     label: "Confidence",
//     value: 10,
//     color: "hsl(118, 70%, 50%)"
//   },
//   {
//     id: "Technical Excellence",
//     label: "Technical Excellence",
//     value: 10,
//     color: "hsl(118, 70%, 50%)"
//   },
//   {
//     id: "Self-Improvement",
//     label: "Self-Improvement",
//     value: 10,
//     color: "hsl(118, 70%, 50%)"
//   }
// ]

class PieData extends React.Component {
  hashRatings() {
    const ratingsArr = this.props.ratings.nodes
    let hash = {}
    ratingsArr.forEach(ratingByAcc => {
      let { skillName, id, pillarByPillarId } = ratingByAcc.skillBySkillId
      if (!hash[skillName]) {
        hash[skillName] = {
          id,
          pillar: pillarByPillarId.title,
          ratings: [ratingByAcc.rating],
          count: 1
        }
      } else {
        hash[skillName].ratings.push(ratingByAcc.rating)
        hash[skillName].count++
      }
    })
    this.buildPillarArray(hash)
    return hash
  }

  buildPillarArray(pillarCountHash) {
    let total = 0
    let pillarArray = []
    for (let key in pillarCountHash) {
      total += pillarCountHash[key].count
    }

    for (let key in pillarCountHash) {
      pillarArray.push({
        id: key,
        label: key,
        // value: (total / pillarCountHash[key].count) * 100
        value: pillarCountHash[key].count
      })
      console.log(total, pillarCountHash[key].count)
    }
    return pillarArray
  }

  calcData = () => {
    const ratingHash = this.hashRatings()
    let hash = {}
    Object.keys(ratingHash).forEach(skill => {
      const { pillar } = ratingHash[skill]
      if (pillar !== undefined) {
        if (!hash[pillar]) {
          hash[pillar] = {
            count: 1
          }
        } else {
          hash[pillar].count++
        }
      }
    })
    return this.buildPillarArray(hash)
  }

  render() {
    const data = this.calcData()
    console.log(data)
    return (
      <div style={{ height: "150px", width: "150px" }}>
        <ResponsivePie
          data={data}
          startAngle={-180}
          innerRadius={0.5}
          padAngle={2}
          cornerRadius={4}
          colors="blue_purple"
          colorBy="id"
          borderWidth={1}
          borderColor="inherit:darker(0.2)"
          radialLabel="label"
          enableRadialLabels={false}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor="#942193"
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={24}
          radialLabelsLinkStrokeWidth={1}
          radialLabelsLinkColor="inherit"
          enableSlicesLabels={true}
          sliceLabel="value"
          //   enableSlicesLabels={false}
          slicesLabelsSkipAngle={10}
          slicesLabelsTextColor="#333333"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          tooltip={function(e) {
            return (
              <span
                style={{
                  color: "#942193"
                }}
              >
                {e.id}
              </span>
            )
          }}
          defs={[
            {
              id: "gradientA",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#F7FCFD" },
                { offset: 100, color: "#E0ECF4" }
              ]
            },
            {
              id: "gradientB",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#E0ECF4" },
                { offset: 100, color: "#BFD2E6" }
              ]
            },
            {
              id: "gradientC",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#BFD2E6" },
                { offset: 100, color: "#9EBBDA" }
              ]
            },
            {
              id: "gradientD",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#9EBBDA" },
                { offset: 100, color: "#8B96C6" }
              ]
            },
            {
              id: "gradientE",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#8B96C6" },
                { offset: 100, color: "#8C6BB0" }
              ]
            },
            {
              id: "gradientF",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#8C6BB0" },
                { offset: 100, color: "#88419D" }
              ]
            },
            {
              id: "gradientG",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#88419D" },
                { offset: 100, color: "#F7FCFD" }
              ]
            }
          ]}
          fill={[
            {
              match: {
                id: "Product Sense"
              },
              id: "gradientA"
            },
            {
              match: {
                id: "Collaboration"
              },
              id: "gradientB"
            },
            {
              match: {
                id: "Focus on Business Value"
              },
              id: "gradientC"
            },
            {
              match: {
                id: "Supportive Culture"
              },
              id: "gradientD"
            },
            {
              match: {
                id: "Confidence"
              },
              id: "gradientE"
            },
            {
              match: {
                id: "Technical Excellence"
              },
              id: "gradientF"
            },
            {
              match: {
                id: "Self-Improvement"
              },
              id: "gradientG"
            }
          ]}
        />
      </div>
    )
  }
}

export default PieData
