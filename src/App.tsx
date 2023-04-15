import { useEffect, useState } from "react"
import { listen } from "@tauri-apps/api/event"
import "./App.css"

const specialKeysObj = {
  Delete: "×",
  PageUp: "⇞",
  PageDown: "⇟",
  Home: "⌂",
  End: "",
  RightArrow: "→",
  DownArrow: "↓",
  UpArrow: "↑",
  LeftArrow: "←",
  Enter: "↵",
  Esc: "␛",
  Backspace: "⌫",
  Space: "␣",
  Tab: "⇆",
}

const specialKeys = Object.keys(specialKeysObj)

function App() {
  const [tickers, setTickers] = useState<string[]>([])
  const [fixedKeycaps, setFixedKeycaps] = useState([
    { title: "Ctrl", id: ["ControlLeft"], active: false },
    { title: "Win", id: ["MetaLeft"], active: false },
    { title: "Alt", id: ["Alt"], active: false },
    { title: "Shift", id: ["ShiftLeft", "ShiftRight"], active: false },
  ])

  const updateTickers = (message: string) => {
    const max = 10
    setTickers((prevTickers) => {
      const charCode = message.charCodeAt(0)

      if (message === "	") {
        console.log("tab ====")
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

      if (message === " ") {
        message = specialKeysObj.Space
      }

      if (message in specialKeysObj) {
        message = specialKeysObj[message]
      }

      let newTickers = [...prevTickers, ...[message]]
      newTickers = newTickers.length > max ? newTickers.slice(1) : newTickers

      return newTickers
    })
  }

  useEffect(() => {
    const unlisten = listen("keypress", ({ payload }) => {
      const { mode, message } = payload as { message: string; mode: string }
      console.log(mode, message)

      if (mode === "Some") {
        updateTickers(message)
      }

      if (mode === "KeyPress") {
        if (specialKeys.includes(message)) {
          updateTickers(message)
          return
        }

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
      <div className="tickers flex items-center justify-center w-full py-10 bg-gray-900 rounded-t-md px-4 shadow-xl">
        {tickers.map((ticker, idx) => {
          return (
            <div className="ticker-item" key={idx}>
              {ticker}
            </div>
          )
        })}
      </div>
      <div className="fixed-keycaps grid grid-cols-4 mt-0.5 gap-0.5">
        {fixedKeycaps.map((keycap, index) => {
          const active = keycap.active
          return (
            <div
              key={index}
              className={`keycap bg-gray-900 text-center shadow-md`}
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
