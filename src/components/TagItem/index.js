import './index.css'

const TagItem = props => {
  const {eachTagItem, updateList} = props
  const {optionId, displayText} = eachTagItem
  const buttonElement = () => {
    updateList(optionId)
  }

  return (
    <li className="list-element">
      <button type="button" className="list-button" onClick={buttonElement}>
        {displayText}
      </button>
    </li>
  )
}
export default TagItem
