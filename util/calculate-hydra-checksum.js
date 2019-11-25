// calculates checksum
const js2xmlparser = require('js2xmlparser');

module.exports = (json) => {
  // convert json to xml and get only the colors element
  const colorsXml = js2xmlparser.parse('ramp', json.ramp)
    .match(/(<colors>.+?<\/colors>)/gms)[0]
    .replace(/(\r\n|\n|\r|\s+)/gm,"");

  let checksum = 0;

  if (colorsXml.length === 0) return k;

  for (var i = 0; i < colorsXml.length; i += 1) {
      const charCode = colorsXml.charCodeAt(i);
      checksum = ((checksum << 5) - checksum) + charCode;
      checksum = checksum & 4294967295;
  }
  if (checksum < 0) checksum = ~checksum;
  return checksum;
};
