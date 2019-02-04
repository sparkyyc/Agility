import React from "react"
import { render } from "react-dom"
import { ResponsivePie } from "@nivo/pie"
import { linearGradientDef } from "@nivo/core"
import { Label } from "semantic-ui-react"

// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.

const data = [
  {
    id: "Product Sense",
    label: "Product Sense",
    value: 20,
    color: "hsl(271, 70%, 50%)"
  },
  {
    id: "Collaboration",
    label: "Collaboratio",
    value: 20,
    color: "hsl(152, 70%, 50%)"
  },
  {
    id: "Focus on Business Value",
    label: "Focus on Business Value",
    value: 20,
    color: "hsl(300, 70%, 50%)"
  },
  {
    id: "Supportive Culture",
    label: "Supportive Culture",
    value: 10,
    color: "hsl(352, 70%, 50%)"
  },
  {
    id: "Confidence",
    label: "Confidence",
    value: 10,
    color: "hsl(118, 70%, 50%)"
  },
  {
    id: "Technical Excellence",
    label: "Technical Excellence",
    value: 10,
    color: "hsl(118, 70%, 50%)"
  },
  {
    id: "Self-Improvement",
    label: "Self-Improvement",
    value: 10,
    color: "hsl(118, 70%, 50%)"
  }
]

class PieData extends React.Component {
  render() {
    return (
      <div style={{ height: "225px", width: "100%" }}>
        <ResponsivePie
          data={data}
          margin={{
            top: 40,
            right: 80,
            bottom: 80,
            left: 80
          }}
          startAngle={-180}
          innerRadius={0.6}
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
