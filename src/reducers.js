module.exports = (metadata) => {

  const similarGamesList = (similar) => {
    return similar.Game.map(game => {
      return {
        id: parseInt(game.id[0]),
        platformId: parseInt(game.PlatformId[0])
      };
    });
  };

  /* ************************************************************** *
   * Images and image lists reducers
   * ************************************************************** */

  const originalImages = (type, images) => {
    return images.map(image => {
      return Object.assign({ type },
        // URL
        { url: image._
          ? `${metadata.staticUrl}/${image._}`
          : `${metadata.staticUrl}/${image}`
        },
        // Image attributes
        image['$'] ? Object.assign({},
          image['$'].width ? { width: parseInt(image['$'].width) } : null,
          image['$'].height ? { height: parseInt(image['$'].height) } : null,
          image['$'].side ? { side: image['$'].side } : null
        ) : null
      );
    });
  };

  const userImages = (type, images) => {
    return images.map(image => {
      return Object.assign({ type },
        image.original ? originalImages(type, image.original)[0] : null,
        image.thumb ? { thumb: image.thumb[0] } : null
      );
    });
  };

  const imagesList = (images) => {
    console.log(images);
    return Object.keys(images)
      .map(type => {
        if (type !== 'fanart' && type !== 'screenshot') {
          return originalImages(type, images[type]);
        } else {
          return userImages(type, images[type]);
        }
      })
      .reduce((images, acc) => acc.concat(images))
    ;
  };

  /* ************************************************************** *
   * Games and game lists reducers
   * ************************************************************** */

  const gameDetail = (game) => {
    return Object.assign(
      metadata.gameDetail.reduce((g, field) => {
        if (game[field.name]) {
          const value = field.parser
            ? field.parser(game[field.name][0])
            : game[field.name][0];
          field.rename
            ? (g[field.rename] = value)
            : (g[field.name] = value);
        }
        return g;
      }, {}),
      game.Similar ? { similar: similarGamesList(game.Similar[0]) } : null,
      game.Images ? { images: imagesList(game.Images[0]) } : null
    );
  };

  const gameList = (games) => {
    return games.map(game => {
      return metadata.gameList.reduce((g, field) => {
        if (game[field.name]) {
          const value = field.parser
            ? field.parser(game[field.name][0])
            : game[field.name][0];
          field.rename
            ? (g[field.rename] = value)
            : (g[field.name] = value)
        }
        return g;
      }, {});
    });
  };

  const gameArtList = (images) => {
    return images.length ? imagesList(images[0]) : [];
  };

  /* ************************************************************** *
   * Platforms and platform lists reducers
   * ************************************************************** */

  const platformDetail = (platform) => {
    return Object.assign(
      metadata.platformDetail.reduce((p, field) => {
        if (platform[field.name]) {
          const value = field.parser
            ? field.parser(platform[field.name][0])
            : platform[field.name][0];
          field.rename
            ? (p[field.rename] = value)
            : (p[field.name] = value)
        }
        return p;
      }, {}),
      platform.Images ? { images: imagesList(platform.Images[0]) } : null
    );
  };

  const platformList = (platforms) => {
    return platforms.map(platform => {
      return metadata.platformList.reduce((p, field) => {
        if (platform[field.name]) {
          const value = field.parser
            ? field.parser(platform[field.name][0])
            : platform[field.name][0];
          field.rename
            ? (p[field.rename] = value)
            : (p[field.name] = value)
        }
        return p;
      }, {});
    });
  };

  return {
    similarGamesList,
    imagesList,
    gameDetail,
    gameList,
    gameArtList,
    platformDetail,
    platformList,
  };
}
