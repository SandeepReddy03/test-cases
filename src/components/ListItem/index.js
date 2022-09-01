import './index.css'

const ListItem = props => {
  const {eachList} = props
  const {name, button} = eachList
  return (
    <li className="list-item-element">
      <p className="paragraph">{name}</p>
      <button type="button" className="button-ele">
        {button}
      </button>
    </li>
  )
}
export default ListItem
