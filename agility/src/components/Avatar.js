import React from "react"
import { Label } from "semantic-ui-react"

const randomColor = () => {
  const colors = ["teal", "blue", "violet", "purple", "pink", "grey", "black"]

  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}

const Avatar = props => {
  const initials = `${props.person.firstName[0]} ${props.person.lastName[0]}`
  return (
    <Label
      color="grey"
      key={props.person.id}
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div style={{ fontSize: props.person.size, fontWeight: "bold" }}>
        {initials}
      </div>
    </Label>
  )
}

export default Avatar
