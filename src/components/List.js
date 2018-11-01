import React, { Component } from 'react';
import ProtoTypes from 'prop-types';

class List extends Component {
  render() {
    const {items, itemElement: Item} = this.props;
    return (
      <ul className="job-list">
      { 
        items.map(item => 
          <li key={item.id}>
            <Item {...item}></Item>
          </li>  
        )
      }
      </ul>
    );
  }
}

List.protoTypes = {
  items: ProtoTypes.array.isRequired,
  itemElement: ProtoTypes.func.isRequired,  
}
export default List;