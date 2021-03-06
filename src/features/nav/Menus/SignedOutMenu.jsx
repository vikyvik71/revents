import React from 'react'
import { Menu, Button } from 'semantic-ui-react'

function SignedOutMenu({ signIn, register }) {
  return <Menu.Item position="right">
      <Button basic inverted content="Login" onClick={signIn} />
      <Button basic inverted content="Sign In" onClick={register} style={{ marginLeft: "0.5em" }} />
    </Menu.Item>;
}

export default SignedOutMenu

