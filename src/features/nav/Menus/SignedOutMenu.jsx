import React from 'react'
import { Menu, Button } from 'semantic-ui-react'

function SignedOutMenu(props) {
  return <Menu.Item position="right">
      <Button basic inverted content="Login" onClick={props.signIn} />
      <Button basic inverted content="Sign In" style={{ marginLeft: "0.5em" }} />
    </Menu.Item>;
}

export default SignedOutMenu

