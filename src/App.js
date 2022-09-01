import {Component} from 'react'
import {v4 as uuid} from 'uuid'

import TagItem from './components/TagItem'

import ListItem from './components/ListItem'

import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    inputElement: 'Hand broke',
    selectItem: tagsList[0].displayText,
    listItems: [],
    activeTabId: '',
    isActive: false,
  }

  onChangeInput = event => {
    this.setState({inputElement: event.target.value})
  }

  onChangeSelectItem = event => {
    this.setState({selectItem: event.target.value})
  }

  onSubmit = event => {
    event.preventDefault()
    const {inputElement, selectItem} = this.state
    const newList = {
      id: uuid(),
      name: inputElement,
      button: selectItem,
      tagButton: selectItem.toUpperCase(),
      isClick: false,
    }

    this.setState(prevState => ({
      listItems: [...prevState.listItems, newList],
    }))
  }

  updateList = optionId => {
    const {isActive} = this.state

    this.setState({activeTabId: optionId, isActive: !isActive})
  }

  filterItemList = () => {
    const {activeTabId, isActive, listItems} = this.state
    if (isActive) {
      return listItems.filter(
        eachFilterItem => activeTabId === eachFilterItem.tagButton,
      )
    }
    return listItems
  }

  render() {
    const {inputElement, selectItem} = this.state
    const filterItemList = this.filterItemList()
    const length = filterItemList.length === 0
    return (
      <div className="bg-container">
        <form className="form-container" onSubmit={this.onSubmit}>
          <h1 className="form-heading">Create a task!</h1>
          <div className="input-container">
            <label className="label-input" htmlFor="input">
              Task
            </label>
            <input
              className="input-element"
              id="input"
              value={inputElement}
              placeholder="Enter the task here"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="input-container">
            <label className="label-input" htmlFor="select">
              Tags
            </label>
            <select
              value={selectItem}
              className="select-item"
              id="select"
              onChange={this.onChangeSelectItem}
            >
              {tagsList.map(eachTag => (
                <option
                  key={eachTag.optionId}
                  value={eachTag.optionId}
                  eachTag={eachTag}
                >
                  {eachTag.displayText}
                </option>
              ))}
            </select>
          </div>
          <div className="button-container">
            <button className="button-element" type="submit">
              Add Task
            </button>
          </div>
        </form>
        <div className="content-container">
          <h1 className="content-heading">Tags</h1>
          <ul className="content-tag-container">
            {tagsList.map(eachTagItem => (
              <TagItem
                key={eachTagItem.optionId}
                eachTagItem={eachTagItem}
                updateList={this.updateList}
              />
            ))}
          </ul>
          <h1 className="content-heading">Tasks</h1>
          {length ? (
            <p className="no-item-para">No Tasks Added Yet</p>
          ) : (
            <ul className="add-list-items">
              {filterItemList.map(eachList => (
                <ListItem key={eachList.id} eachList={eachList} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
