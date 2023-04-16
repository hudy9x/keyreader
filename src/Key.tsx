export default function Key({ ticker }: { ticker: string }) {
  return <div className={`ticker-item transition-all`}>{ticker}</div>
}
