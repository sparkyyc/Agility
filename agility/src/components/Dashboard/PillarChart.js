import React from "react"
import { ResponsiveBar } from "@nivo/bar"

const data = [
  {
    Pillar: "Product Sense",
    javascript: 1,
    color: "hsl(271, 70%, 50%)"
  },
  {
    Pillar: "Collaboration",
    javascript: 1,
    color: "hsl(271, 70%, 50%)"
  },
  {
    Pillar: "Focus on Business Value",
    javascript: 1,
    color: "hsl(271, 70%, 50%)"
  },
  {
    Pillar: "Supportive Culture",
    javascript: 1,
    color: "hsl(271, 70%, 50%)"
  },
  {
    Pillar: "Confidence",
    javascript: 1,
    color: "hsl(271, 70%, 50%)"
  },
  {
    Pillar: "Technical Excellence",
    javascript: 1,
    color: "hsl(271, 70%, 50%)"
  },
  {
    Pillar: "Self-Improvement",
    javascript: 1,
    color: "hsl(271, 70%, 50%)"
  }
]

class Chart extends React.Component {
  render() {
    return (
      <ResponsiveBar
        data={data}
        keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
        indexBy="Pillar"
        margin={{
          top: 50,
          right: 130,
          bottom: 50,
          left: 60
        }}
        padding={0.3}
        colors="blue_purple"
        colorBy="id"
        defs={[]}
        fill={[]}
        borderColor="inherit:darker(1.6)"
        axisTop="null"
        axisRight="null"
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country",
          legendPosition: "middle",
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "food",
          legendPosition: "middle",
          legendOffset: -40
        }}
        enableGridY={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="inherit:darker(1.6)"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        tooltip={function() {}}
        legends={[]}
      />
    )
  }
}

export default Chart
