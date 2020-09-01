import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(dataList => (
          <tr key={dataList._id}>
            {columns.map(column => (
              <td key={dataList._id + (column.path || column.key)} scope="row">
                {this.renderCell(dataList, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  renderCell = (dataList, column) => {
    if (column.content) return column.content(dataList);

    return _.get(dataList, column.path);
  };
}

export default TableBody;
