import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './posts.css';

export default class Picker extends Component {
  render() {
    const { value, isFetching, refreshClick, onChange, options, lastUpdated } = this.props

    return (
      <span>
        <table className="input-component"> <tbody> <tr>
          <td>
            <select onChange={e => onChange(e.target.value)} value={value}>
              {options.map(option => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </td>
          { lastUpdated && (
                  <td className="last-update"> {`Last updated at ${new Date(lastUpdated).toLocaleTimeString()}`}
                  </td>
                )
          }
          <td>
          {
              !isFetching &&
                 <p className="refresh-click" onClick={(e) => refreshClick(e)}>
                    Refresh
                </p>
          }
          </td>
        </tr></tbody></table>
      </span>
    )
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}