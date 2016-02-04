const xml2js = require('xml2js');

module.exports = {

  parseXml(xml) {
    return new Promise((resolve, reject) => {
      xml2js.parseString(xml, { trim: true }, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },

  parseDate(dateString) {
    const d = dateString.split('/').map(n => parseInt(n));
    return new Date(d[2], d[0], d[1]);
  },

  pprint(data) { console.log(JSON.stringify(data, null, 2)) },

};
