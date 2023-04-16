import { useEffect, useState } from "react"
import { listen } from "@tauri-apps/api/event"
import "./App.css"
import Key from "./Key"

const specialKeysObj: {
  [key: string]: string
} = {
  Delete: "⌦",
  PageUp: "⇞",
  PageDown: "⇟",
  Home: "⇱",
  End: "⇲",
  RightArrow: "→",
  DownArrow: "↓",
  UpArrow: "↑",
  LeftArrow: "←",
  Enter: "↵",
  Esc: "⎋",
  Backspace: "⌫",
  Space: "␣",
  Tab: "⇆",
  Control: "⌃",
  ControlLeft: "⌃",
  ControlRight: "⌃",
  Alt: "⌥",
  AltGr: "⌥",
  CapsLock: "⇪",
  Shift: "⇧",
  ShiftLeft: "⇧",
  ShiftRight: "⇧",
  MetaLeft: "⊞",
  MetaRight: "⊞",
  Minus: "-",
  Equal: "=",
  SemiColon: ";",
  Quote: "'",
  Dot: ".",
  Comma: ",",
  Slash: "/",
}

const controlKeyCodes = [
  "@",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "[",
  "\\",
  "]",
  "^",
  "_",
]

let controlPressed = false
const controlKeys = ["ControlLeft", "ControlRight"]

function App() {
  const [tickers, setTickers] = useState<string[]>(["."])
  const [fixedKeycaps, setFixedKeycaps] = useState([
    {
      title: specialKeysObj.ShiftLeft,
      id: ["ShiftLeft", "ShiftRight"],
      active: false,
    },
    {
      title: specialKeysObj.ControlLeft,
      id: controlKeys,
      active: false,
    },
    { title: specialKeysObj.Alt, id: ["Alt"], active: false },
    {
      title: specialKeysObj.MetaLeft,
      id: ["MetaLeft", "MetaRight"],
      active: false,
    },
  ])

  const updateTickers = (message: string) => {
    const max = 6
    setTickers((prevTickers) => {
      const charCode = message.charCodeAt(0)

      if (message === "	") {
        message = specialKeysObj.Tab
      }

      if (charCode === 13) {
        message = specialKeysObj.Enter
      }

      if (charCode === 27) {
        message = specialKeysObj.Esc
      }

      console.log("controlPressed", controlPressed)
      if (controlKeyCodes[charCode] && controlPressed) {
        message = controlKeyCodes[charCode]
      }

      if (charCode === 8) {
        message = specialKeysObj.Backspace
      }

      if (message === " ") {
        message = specialKeysObj.Space
      }

      if (message in specialKeysObj) {
        message = specialKeysObj[message]
      }

      let newTickers = []
      if (
        [
          specialKeysObj.ControlLeft,
          specialKeysObj.ControlRight,
          specialKeysObj.MetaLeft,
          specialKeysObj.MetaRight,
          specialKeysObj.Alt,
          specialKeysObj.AltGr,
          specialKeysObj.ShiftLeft,
          specialKeysObj.ShiftRight,
        ].includes(message)
      ) {
        newTickers = [message]
      } else {
        newTickers = [...prevTickers, ...[message]]
      }

      newTickers = newTickers.length > max ? newTickers.slice(1) : newTickers

      return newTickers
    })
  }

  useEffect(() => {
    let isCtrl
    const unlisten = listen("keypress", ({ payload }) => {
      console.log("====================")
      const { mode, message } = payload as { message: string; mode: string }
      console.log(mode, message, message.charCodeAt(0))

      if (mode === "Some") {
        updateTickers(message)
      }

      if (mode === "KeyPress") {
        if (controlKeys.includes(message)) {
          console.log("109238098")
          controlPressed = true
        }

        updateTickers(message)

        setFixedKeycaps((fixedKeycaps) => {
          return fixedKeycaps.map((keycap) => {
            const cloned = { ...keycap }
            if (cloned.id.includes(message)) {
              cloned.active = true
            }
            return cloned
          })
        })
      }

      if (mode === "KeyRelease") {
        if (controlKeys.includes(message)) {
          controlPressed = false
        }
        setFixedKeycaps((fixedKeycaps) => {
          return fixedKeycaps.map((keycap) => {
            const cloned = { ...keycap }
            if (cloned.id.includes(message)) {
              cloned.active = false
            }
            return cloned
          })
        })
      }

      return () => {
        console.log("called")
        unlisten.then((stop) => stop())
      }
    })
  }, [])

  return (
    <div
      data-tauri-drag-region
      className="ticker-container overflow-hidden w-[300px] flex flex-col"
    >
      <div className="tickers flex items-center justify-center w-full py-10 main-background px-4 shadow-xl">
        {tickers.map((ticker, idx) => {
          return <Key key={idx} ticker={ticker} />
        })}
      </div>
      <div className="fixed-keycaps grid grid-cols-4 mt-0.5 gap-0.5">
        {fixedKeycaps.map((keycap, index) => {
          const active = keycap.active
          return (
            <div
              key={index}
              className={`keycap main-background text-center shadow-md`}
            >
              <span className={active ? "" : "opacity-50"}>{keycap.title}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
