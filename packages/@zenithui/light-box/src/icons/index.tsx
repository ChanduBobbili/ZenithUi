import "./index.css"
const LoadingSpinner = () => {
  const bars = Array(12).fill(0)
  return (
    <div className={["zenithui-loading-wrapper"].filter(Boolean).join(" ")}>
      <div className="zenithui-spinner">
        {bars.map((_, i) => (
          <div
            className="zenithui-loading-bar"
            key={`zenithui-spinner-bar-${i.toString()}`}
          />
        ))}
      </div>
    </div>
  )
}
const ICONS = {
  loading: LoadingSpinner,
}

export default ICONS
