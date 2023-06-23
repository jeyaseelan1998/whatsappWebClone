export const groupByDate = arr => {

  const groupByDateMap = {};
  for (let item of arr) {
    let date = new Date(item.message?.timeStamp?.toDate());
    date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    
    if( date !== "NaN/NaN/NaN") {
      const keys = Object.keys(groupByDateMap);

      if (keys.includes(date)) {
        groupByDateMap[date].push(item);
      }
      else {
        groupByDateMap[date] = [item]
      }
    }
  }

  return groupByDateMap;
}
