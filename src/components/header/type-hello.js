import React, { useEffect, useReducer } from 'react'
import { title as baseStyle, blinkBorder, whiteBorder } from './style'

export default function TypeHello() {
  const initialState = {
    text: '',
    style: theme => [baseStyle, whiteBorder].map(a => a(theme)),
  }
  const reducer = (state, action) => {
    switch (action.type) {
      case 'add':
        return { ...state, text: [state.text, action.payload].join('') }
      case 'del':
        return {
          ...state,
          text: state.text.substring(0, state.text.length - 1),
        }
      case 'updateClasses':
        return {
          ...state,
          style: theme => action.payload(theme),
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  function tick(cb) {
    let rand = Math.random() * 100 + 200
    setTimeout(() => {
      cb()
    }, rand)
  }

  function writeText(stringToType) {
    return new Promise(resolve => {
      let i = 0
      function cb() {
        const payload = stringToType[i]
        dispatch({ type: 'add', payload })
        if (i < stringToType.length) {
          tick(cb)
          i++
        } else {
          resolve()
        }
      }

      tick(cb)
    })
  }

  function deleteText(stop) {
    return new Promise(resolve => {
      let i = 0
      const tick = setInterval(() => {
        dispatch({ type: 'del' })
        i++
        if (i === stop) {
          clearInterval(tick)
          resolve()
        }
      }, 150)
    })
  }

  function cursorAnimation() {
    dispatch({
      type: 'updateClasses',
      payload: theme =>
        [baseStyle, whiteBorder, blinkBorder].map(a => a(theme)),
    })
    setTimeout(() => {
      dispatch({ type: 'updateClasses', payload: theme => [baseStyle(theme)] })
    }, 2500)
  }

  async function type() {
    await writeText('<HelloWorld'.split(''))
    await deleteText(5)
    await writeText('Code />'.split(''))
    cursorAnimation()
  }

  useEffect(() => {
    type()
  }, [])

  return <h1 css={theme => state.style(theme)}>{state.text}</h1>
}
