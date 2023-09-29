module.exports = {
  eq: (a, b) => {
    return a == b;
  },
  simpleDateString: (dateString) => {
    var date = new Date(dateString);

    var year = date.getFullYear().toString().slice(-2);
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var day = date.getDate().toString().padStart(2, "0");

    return `${month}.${day}`;
  },
  fullDateString: (dateString) => {
    var date = new Date(dateString);

    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var day = date.getDate().toString().padStart(2, "0");

    var hours = date.getHours().toString().padStart(2, "0");
    var minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  },
};
