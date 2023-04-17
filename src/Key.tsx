export default function Key({ ticker }: { ticker: string }) {
  if (ticker === "NONE") {
    return (
      <div className="ticker-item transition-all grow-0 text-transparent">
        .
      </div>
    )
  }
  return <div className="ticker-item transition-all grow-0">{ticker}</div>
}
