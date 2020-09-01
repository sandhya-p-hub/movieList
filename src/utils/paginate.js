//to paginate data.. we will use lodash and get the data..

import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  console.log("pagination func items --> ", startIndex);
  //_.slice(items,startindex)
  //_.take(pageSize)
  // _(items) --> this vl retrurn lodash obj so that we chain all lodash method as this-->
  const pagianteValue = _(items)
    .slice(startIndex)
    .take(pageSize)
    .value(); // convert items array to loadash

  console.log("fianl paginate ", pagianteValue);

  return pagianteValue;
}
