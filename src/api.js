const axios = require('axios');
const parse = require('./utils').parseXml;
const metadata = require('./metadata');
const reducers = require('./reducers')(metadata);


module.exports = {

  getGamesList(args) {
    // Raise if name is not declared
    if (!args.name) throw "'name' argument is required";

    return axios.get(`${metadata.endpoint}/GetGamesList.php`, { params: args })
      .then(response => parse(response.data))
      .then(data => data.Data.Game || [])
      .then(reducers.gameList)
    ;
  },

  getGame(args) {
    // Raise if id is not declared
    if (!args.id) throw "'id' argument is required";

    return axios.get(`${metadata.endpoint}/GetGame.php`, { params: args })
      .then(response => parse(response.data))
      .then(data => data.Data.Game[0] || {})
      .then(reducers.gameDetail)
    ;
  },

  getGameArt(args) {
    // Raise if id is not declared
    if (!args.id) throw "'id' argument is required";

    return axios.get(`${metadata.endpoint}/GetArt.php`, { params: args })
      .then(response => parse(response.data))
      .then(data => data.Data.Images || [])
      .then(reducers.gameArtList)
    ;
  },

  getPlatformsList() {
    return axios.get(`${metadata.endpoint}/GetPlatformsList.php`)
      .then(response => parse(response.data))
      .then(data => data.Data ? data.Data.Platforms[0].Platform : [])
      .then(reducers.platformList)
    ;
  },

  getPlatform(args) {
    // Raise if id is not declared
    if (!args.id) throw "'id' argument is required";

    return axios.get(`${metadata.endpoint}/GetPlatform.php`, { params: args })
      .then(response => parse(response.data))
      .then(data => data.Data.Platform[0] || {})
      .then(reducers.platformDetail)
    ;
  },

  getPlatformGames(args) {
    // Raise if id is not declared
    if (!args.id) throw "'id' argument is required";
    const params = { platform: args.id };

    return axios.get(`${metadata.endpoint}/GetPlatformGames.php`, { params })
      .then(response => parse(response.data))
      .then(data => data.Data.Game || [])
      .then(reducers.gameList)
    ;
  },

};
