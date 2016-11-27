import React, { PropTypes } from 'react';

const c = 'key-value'

export default React.createClass({
  displayName: 'KeyValue',
  propTypes: {
    rows: PropTypes.arrayOf(PropTypes.shape({
      keyItem: PropTypes.string,
      valueItem: PropTypes.string
    })),
    onChange: PropTypes.func,
    customAddButtonRenderer: PropTypes.func
  },
  getDefaultProps() {
    return {
      rows: [],
      onChange: () => {}
    };
  },
  getInitialState() {
    return {
      rows: [
        ...this.props.rows
      ]
    }
  },
  handleAddNew() {
    this.setState({
      rows: [
        ...this.state.rows,
        {
          keyItem: '',
          valueItem: ''
        }
      ]
    }, () => {
      this.props.onChange([ ...this.state.rows ]);
    });
  },
  handleKeyItemChange(index, value) {
    this.setState({
      rows: this.state.rows.map((row, i) => {
        if (index !== i) {
          return row;
        }
        return {
          ...row,
          keyItem: value
        };
      })
    }, () => {
      this.props.onChange([ ...this.state.rows ]);
    });
  },
  handleValueItemChange(index, value) {
    this.setState({
      rows: this.state.rows.map((row, i) => {
        if (index !== i) {
          return row;
        }
        return {
          ...row,
          valueItem: value
        };
      })
    }, () => {
      this.props.onChange([ ...this.state.rows ]);
    });
  },
  handleRemove(index) {
    this.setState({
      rows: this.state.rows.filter((row, i) => i !== index)
    }, () => {
      this.props.onChange([ ...this.state.rows ])
    });
  },
  renderKeyItem(index, value) {
    return (
      <label>
        Key:
        <input
          type="text"
          value={ value }
          onChange={ (e) => this.handleKeyItemChange(index, e.currentTarget.value) }
        />
      </label>
    );
  },
  renderValueItem(index, value) {
    return (
      <label>
        Value:
        <input
          type="text"
          value={ value }
          onChange={ (e) => this.handleValueItemChange(index, e.currentTarget.value) }
        />
      </label>
    );
  },
  renderRows() {
    return this.state.rows.map((row, i) => (
      <div
        key={ `key-value-row-${i}` }
        className={ `${c}-row` }
      >
        <div className={ `${c}-row-key-item` }>
          { this.renderKeyItem(i, row.keyItem) }
        </div>
        <div className={ `${c}-row-value-item` }>
          { this.renderValueItem(i, row.valueItem) }
        </div>
        <div className={ `${c}-row-remove` }>
          <button
            onClick={ () => this.handleRemove(i) }
          >
            -
          </button>
        </div>
      </div>
    ));
  },
  renderAddButton() {
    if (typeof this.props.customAddButtonRenderer === 'function') {
      return this.props.customAddButtonRenderer(this.handleAddNew);
    }
    return (
      <button
        onClick={ this.handleAddNew }
      >
        Add new
      </button>
    );
  },
  render() {
    return (
      <div className={ c }>
        <div className={ `${c}-rows` }>
          { this.renderRows() }
        </div>
        <div className={ `${c}-add-new` }>
          { this.renderAddButton() }
        </div>
      </div>
    );
  }
});