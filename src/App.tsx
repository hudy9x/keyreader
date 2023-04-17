import { useEffect, useState } from "react"
import { listen } from "@tauri-apps/api/event"
import { appWindow } from "@tauri-apps/api/window"
import "./App.css"
import Key from "./Key"
import { controlKeyCodes, specialKeysObj } from "./config"

let controlPressed = false
const controlKeys = ["ControlLeft", "ControlRight"]

function App() {
  const [tickers, setTickers] = useState<string[]>(["NONE"])
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

  const calculateMaxDisplayChars = () => {
    const tickerContainer = document.querySelector(".tickers") as HTMLDivElement
    const tickerItems = document.querySelectorAll(
      ".ticker-item"
    ) as NodeListOf<HTMLDivElement>

    let width = 0
    const maxWidth = tickerContainer.offsetWidth

    tickerItems.forEach((ticker) => {
      width += ticker.offsetWidth
    })

    const deltaWidth = maxWidth - width

    if (deltaWidth < 0) {
      return 3
    }

    if (deltaWidth < 75) {
      return 5
    }

    if (deltaWidth < 200) {
      return 12
    }

    return 14
  }

  const updateTickers = (message: string) => {
    const max = calculateMaxDisplayChars()

    setTickers((prevTickers) => {
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

      if (controlKeyCodes[charCode] && controlPressed) {
        message = controlKeyCodes[charCode]
      }

      if (charCode === 8) {
        message = specialKeysObj.Backspace
      }

      if (charCode === 32) {
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
        ].includes(message)
      ) {
        newTickers = [message]
      } else {
        newTickers = [...prevTickers, ...[message]]
      }

      const currLen = newTickers.length
      newTickers = currLen > max ? newTickers.slice(currLen - max) : newTickers

      return newTickers
    })
  }

  useEffect(() => {
    const unlisten = listen("keypress", ({ payload }) => {
      const { mode, message } = payload as { message: string; mode: string }

      if (mode === "Some") {
        updateTickers(message)
      }

      if (mode === "KeyPress") {
        console.log("keypress", message)
        if (controlKeys.includes(message)) {
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
        unlisten.then((stop) => stop())
      }
    })
  }, [])

  return (
    <div
      data-tauri-drag-region
      className="ticker-container overflow-hidden w-[300px] flex flex-col group relative"
    >
      <button
        onClick={() => {
          appWindow.close()
        }}
        className="btn-close group-hover:opacity-100 "
      >
        ✕
      </button>
      <div className="tickers flex items-center justify-center w-full py-10 main-background px-8 shadow-xl">
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
