import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Button } from "react-bootstrap"

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  Togglable.displayName = 'Togglable'

  return (
    <>
      {/* <div style={hideWhenVisible}> */}
        <Button variant="primary" style={hideWhenVisible} onClick={toggleVisibility}>{props.buttonLabel}</Button>
      {/* </div> */}
      <div style={showWhenVisible}>
        {props.children}
      </div>
    </>
  )
})

export default Togglable