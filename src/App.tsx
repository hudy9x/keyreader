import { useEffect, useState } from "react"
import { listen } from "@tauri-apps/api/event"
import { appWindow } from "@tauri-apps/api/window"
import Key from "./Key"
import { controlKeyCodes, specialKeysObj } from "./config"

let controlPressed = false
const controlKeys = ["ControlLeft", "ControlRight"]
const shiftKeys = ["ShiftLeft", "ShiftRight"]
const metaKeys = ["MetaLeft", "MetaRight"]
const altKeys = ["Alt", "AltGr"]

function App() {
  const [alphabeticKeys, setAlphabeticKeys] = useState<string[]>(["NONE"])
  const [modifierKeys, setModifierKeys] = useState([
    {
      title: specialKeysObj.ShiftLeft,
      id: shiftKeys,
      active: false,
    },
    {
      title: specialKeysObj.ControlLeft,
      id: controlKeys,
      active: false,
    },
    { title: specialKeysObj.Alt, id: altKeys, active: false },
    {
      title: specialKeysObj.MetaLeft,
      id: metaKeys,
      active: false,
    },
  ])

  const needTobeCleared = (message: string) =>
    [
      specialKeysObj.ControlLeft,
      specialKeysObj.ControlRight,
      specialKeysObj.MetaLeft,
      specialKeysObj.MetaRight,
      specialKeysObj.Alt,
      specialKeysObj.AltGr,
      specialKeysObj.Esc,
    ].includes(message)

  const updateTickers = (message: string) => {
    const max = 5

    setAlphabeticKeys((prevTickers) => {
      const charCode = message.charCodeAt(0)

      if (charCode === 9) {
        message = specialKeysObj.Tab
      }

      if (charCode === 13) {
        message = specialKeysObj.Enter
      }

      if (charCode === 27) {
        message = specialKeysObj.Esc
      }

      if (charCode === 8) {
        message = specialKeysObj.Backspace
      }

      if (charCode === 32) {
        message = specialKeysObj.Space
      }

      if (controlKeyCodes[charCode] && controlPressed) {
        message = controlKeyCodes[charCode]
      }

      if (message in specialKeysObj) {
        message = specialKeysObj[message]
      }

      let newTickers = []
      if (needTobeCleared(message)) {
        newTickers = [message]
      } else {
        newTickers = [...prevTickers, ...[message]]
      }

      const currLen = newTickers.length
      newTickers = currLen > max ? newTickers.slice(1) : newTickers

      return newTickers
    })
  }

  const updateModifierActiveStatus = (message: string, status: boolean) => {
    setModifierKeys((modifierKeys) => {
      return modifierKeys.map((keycap) => {
        const cloned = { ...keycap }
        if (cloned.id.includes(message)) {
          cloned.active = status
        }
        return cloned
      })
    })
  }

  const updateControlPressedStatus = (message: string, status: boolean) => {
    if (controlKeys.includes(message)) controlPressed = status
  }

  const closeWindow = () => {
    appWindow.close()
  }

  useEffect(() => {
    const unlisten = listen("keypress", ({ payload }) => {
      const { mode, message } = payload as { message: string; mode: string }

      if (mode === "Some") {
        updateTickers(message)
      }

      if (mode === "KeyPress") {
        updateControlPressedStatus(message, true)
        updateTickers(message)
        updateModifierActiveStatus(message, true)
      }

      if (mode === "KeyRelease") {
        updateControlPressedStatus(message, false)
        updateModifierActiveStatus(message, false)
      }
    })

    return () => {
      unlisten.then((stop) => stop())
    }
  }, [])

  return (
    <div data-tauri-drag-region className="ticker-container group">
      <button
        onClick={closeWindow}
        className="btn-close group-hover:opacity-100 "
      >
        ✕
      </button>
      <div className="tickers">
        {alphabeticKeys.map((ticker, idx) => {
          return <Key key={idx} ticker={ticker} />
        })}
      </div>
      <div className="modifier-keycaps">
        {modifierKeys.map((keycap, index) => {
          const active = keycap.active
          return (
            <div key={index} className={`keycap main-background`}>
              <span className={active ? "" : "opacity-50"}>{keycap.title}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
