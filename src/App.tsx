import { SuperSEO } from "react-super-seo"
export default function App() {
  return (
    <div className="app mx-auto sm:w-[700px]">
      <SuperSEO
        title="KeyReader"
        description="A simple keystroke application for Windows"
        lang="en"
        openGraph={{
          ogImage: {
            ogImage: "/keyreader/screenshot.png",
            ogImageAlt: "KeyReader",
            ogImageWidth: 400,
            ogImageHeight: 200,
            ogImageType: "image/png",
          },
        }}
        twitter={{
          twitterSummaryCard: {
            summaryCardImage: "/keyreader/screenshot.png",
            summaryCardImageAlt: "KeyReader",
            summaryCardSiteUsername: "hudy9x",
          },
        }}
      />
      <div className="header flex items-center justify-between px-4 py-8">
        <h1>
          <img src="/keyreader/logo.png" className="inline-block w-12 pr-2" />
          <span className="font-bold text-gray-800">KeyReader</span>
          <span className="pl-2 text-xs text-gray-400">v0.4.0</span>
        </h1>
        <a href="https://github.com/hudy9x/keyreader">
          <button type="button" className="" aria-label="Github">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 496 512"
              className="text-xl"
              aria-hidden="true"
              focusable="false"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
            </svg>
          </button>
        </a>
      </div>
      <div className="main text-center space-y-4 mt-[20px] sm:mt-[40px]">
        <h2 className="font-bold text-2xl sm:text-3xl px-4 sm:w-[500px] mx-auto">
          A simple keystroke application for Windows
        </h2>
        <p className="text-gray-400 text-sm px-4 text-xs sm:text-sm sm:w-[550px] leading-6 mx-auto">
          Inspired by KeyCastr and built on Tauri toolkit with ReactJS.
          <br /> It is an open source, so feel free to fork for creating your
          own or contribute your features, fixbugs to my repos. I would love to
          learn from you guys
        </p>
        <img src="/keyreader/screenshot.png" className="inline-block" />

        <div className="space-y-5 pb-[100px] mx-5">
          <a href="https://github.com/hudy9x/keyreader/releases/latest">
            <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Download now
            </button>
          </a>
          <p className="text-gray-700">
            or install it using scoop - a command-line installer for Windows
          </p>
          <p className="text-sm text-gray-500 text-left bg-gray-100 px-4 py-3 border rounded-md">
            $ scoop bucket add my-bucket https://github.com/hudy9x/scoop-buckets{" "}
            <br />$ scoop install keyreader
          </p>
          <p className="py-8 text-gray-500 text-sm">
            Made with 💖 by <a href="https://github.com/hudy9x">@hudy9x</a>
          </p>
        </div>
      </div>
    </div>
  )
}
