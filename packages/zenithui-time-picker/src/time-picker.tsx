const TimePicker = () => {
  return (
    <div className="time-picker">
      <div className="time-picker__header">
        <div className="time-picker__header__title">Time Picker</div>
      </div>
      <div className="time-picker__body">
        <div className="time-picker__body__input">
          <input type="text" />
        </div>
        <div className="time-picker__body__dropdown">
          <div className="time-picker__body__dropdown__item">12:00</div>
          <div className="time-picker__body__dropdown__item">13:00</div>
          <div className="time-picker__body__dropdown__item">14:00</div>
        </div>
      </div>
    </div>
  )
}
export default { TimePicker }
