import _ from 'lodash';

export function pagination(itemsArray, pageIndex, pageSize) {
    const startIndex = (pageIndex - 1) * pageSize;
    return _(itemsArray).slice(startIndex).take(pageSize).value();
}
