import React from "react"
import { render } from "react-dom"
import { ResponsivePie } from "@nivo/pie"
import { linearGradientDef } from "@nivo/core"
import { Label } from "semantic-ui-react"
import "../Dashboard/Pie.css"

// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.

const data = [
  {
    id: "0",
    label: "Questioning",
    value: 20,
    color: "hsl(271, 70%, 50%)",
    info: "Not sure what the skill is, or why/when it would be needed."
  },
  {
    id: "1",
    label: "Learning",
    value: 20,
    color: "hsl(152, 70%, 50%)",
    info: "Know what the skill is, no first-hand experience."
  },
  {
    id: "2",
    label: "Practicing",
    value: 20,
    color: "hsl(300, 70%, 50%)",
    info:
      "Actively using skill, can reference more than one resource that you've used to learn about this skill."
  },
  {
    id: "3",
    label: "Journeying",
    value: 20,
    color: "hsl(352, 70%, 50%)",
    info:
      "Has used the skill in multiple environments, peers recognize this person's competence."
  },
  {
    id: "4",
    label: "Mastering",
    value: 20,
    color: "hsl(118, 70%, 50%)",
    info:
      "Unquestioned competence in a skill, can explain underlying forces to others"
  }
]

class PieData extends React.Component {
  render() {
    return (
      <div style={{ height: "400px" }}>
        <ResponsivePie
          data={data}
          margin={{
            top: 40,
            right: 80,
            bottom: 80,
            left: 80
          }}
          startAngle={-180}
          innerRadius={0.15}
          padAngle={2}
          cornerRadius={4}
          colors="blue_purple"
          colorBy="id"
          borderWidth={1}
          borderColor="inherit:darker(0.2)"
          radialLabel="label"
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor="#942193"
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={24}
          radialLabelsLinkStrokeWidth={1}
          radialLabelsLinkColor="inherit"
          enableSlicesLabels={true}
          sliceLabel="id"
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
                {e.info}
              </span>
            )
          }}
          defs={[
            {
              id: "gradientA",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#77a1d3" },
                { offset: 100, color: "#79cbca" }
              ]
            },
            {
              id: "gradientB",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#79cbca" },
                { offset: 100, color: "#e684ae" }
              ]
            },
            {
              id: "gradientC",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#e684ae" },
                { offset: 100, color: "#77a1d3" }
              ]
            },
            {
              id: "gradientD",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#79cbca" },
                { offset: 100, color: "#77a1d3" }
              ]
            },
            {
              id: "gradientE",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "#e684ae" },
                { offset: 100, color: "#79cbca" }
              ]
            }
          ]}
          fill={[
            {
              match: {
                id: "0"
              },
              id: "gradientA"
            },
            {
              match: {
                id: "1"
              },
              id: "gradientB"
            },
            {
              match: {
                id: "2"
              },
              id: "gradientC"
            },
            {
              match: {
                id: "3"
              },
              id: "gradientD"
            },
            {
              match: {
                id: "4"
              },
              id: "gradientE"
            }
          ]}
        />
      </div>
    )
  }
}

export default PieData
