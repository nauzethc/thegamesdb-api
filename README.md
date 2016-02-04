# TheGamesDB.js
Just a Javascript wrapper to [TheGamesDB.net](http://thegamesdb.net/) API. Original API documentation can be found [here](http://wiki.thegamesdb.net/index.php/API_Introduction).

## Introduction
Althought other libraries can query the API and parse XML responses, I found that resultant objects were too complex and not so normalized as I wished. So I've used reducer functions to create simpler objects and attributes, with parsed data (numbers and dates) and normalized lists, to be more serializable and JSON friendly.

Query functions return Javascript *promises* using promise based [axios]([https://github.com/mzabriskie/axios) client library (browser and Node compatible).

## Installation
```bash
npm install thegamesdb
```

## Usage
```javascript
// ES6
import thegamesdb from 'thegamesdb';

// ES5
var thegamesdb = require('thegamesdb');

thegamesdb.getGame({ id: 1 }).then(cb);
thegamesdb.getGamesList({ name: 'super mario' }).then(cb).catch(err);
...
```

## API
### thegamesdb.getGame({ *id* }): *Object*
```javascript
thegamesdb.getGame({ id: 1})
```
```json
{
  "id": 1,
  "title": "Halo: Combat Evolved",
  "platform": "PC",
  "releaseDate": "2001-12-15T00:00:00.000Z",
  "overview": "In Halo's twenty-sixth century setting, the player assumes the role of the Master Chief, a cybernetically enhanced super-soldier. The player is accompanied by Cortana, an artificial intelligence who occupies the Master Chief's neural interface. Players battle various aliens on foot and in vehicles as they attempt to uncover the secrets of the eponymous Halo, a ring-shaped artificial planet.",
  "ESRB": "T - Teen",
  "genres": [
    "Shooter"
  ],
  "players": "1",
  "youtube": "http://www.youtube.com/watch?v=dR3Hm8scbEw",
  "publisher": "Microsoft Game Studios",
  "developer": "Bungie",
  "rating": 6.8889,
  "similar": [
    {
      "id": 3996,
      "platformId": 14
    }
  ],
  "images": [
    {
      "type": "clearlogo",
      "url": "/clearlogo/1.png",
      "width": 400,
      "height": 200
    },
    {
      "type": "screenshot",
      "url": "/screenshots/1-1.jpg",
      "width": 800,
      "height": 600,
      "thumb": "/screenshots/thumb/1-1.jpg"
    },
    {
      "type": "screenshot",
      "url": "/screenshots/1-2.jpg",
      "width": 800,
      "height": 600,
      "thumb": "/screenshots/thumb/1-2.jpg"
    },
    ...
  ]
}
```

### thegamesdb.getGamesList({ *name* [, *platform* ] }): *Array*
`name` param is mandatory. You can filter results by including **exact** platform name (not alias or ID).
```javascript
thegamesdb.getGamesList({ name: 'super mario', platform: 'Super Nintendo (SNES)'})
```
```json
[
  {
    "id": 3275,
    "title": "Super Mario All-Stars + Super Mario World",
    "releaseDate": "1994-01-16T00:00:00.000Z",
    "platform": "Super Nintendo (SNES)"
  },
  {
    "id": 136,
    "title": "Super Mario World",
    "releaseDate": "1990-12-21T00:00:00.000Z",
    "platform": "Super Nintendo (SNES)"
  },
  {
    "id": 21356,
    "title": "Mario no Super Picross",
    "releaseDate": "1995-10-14T00:00:00.000Z",
    "platform": "Super Nintendo (SNES)"
  },
  {
    "id": 41,
    "title": "Super Mario Kart",
    "releaseDate": "1992-10-01T00:00:00.000Z",
    "platform": "Super Nintendo (SNES)"
  },
  ...
]
```

### thegamesdb.getGameArt({ *id* }): *Array*
```javascript
thegamesdb.getGameArt({ id: 4 })
```
```json
[
  {
    "type": "clearlogo",
    "url": "/clearlogo/4.png",
    "width": 400,
    "height": 148
  },
  {
    "type": "screenshot",
    "url": "/screenshots/4-1.jpg",
    "width": 1920,
    "height": 1080,
    "thumb": "/screenshots/thumb/4-1.jpg"
  },
  {
    "type": "banner",
    "url": "/graphical/4-g.jpg",
    "width": 760,
    "height": 140
  },
  {
    "type": "boxart",
    "url": "/boxart/original/back/4-1.jpg",
    "width": 1000,
    "height": 705,
    "side": "back"
  },
  ...
]
```

### thegamesdb.getPlatform({ *id* }): *Object*
```javascript
thegamesdb.getPlatform({ id: 1 })
```
```json
{
  "id": 1,
  "name": "PC",
  "overview": "PC stands for Personal Computer. Mass-market consumer computers use highly standardized components and so are simple for an end user to assemble into a working system. A typical desktop computer consists of a computer case which holds the power supply, motherboard, hard disk and often an optical disc drive. External devices such as a computer monitor or visual display unit, keyboard, and a pointing device are usually found in a personal computer.",
  "developer": "IBM",
  "cpu": "x86 Based",
  "rating": 7,
  "images": [...]
}
```

### thegamesdb.getPlatformsList(): *Array*
```javascript
thegamesdb.getPlatformsList()
```
```json
[
  {
    "id": 25,
    "name": "3DO",
    "alias": "3do"
  },
  {
    "id": 4944,
    "name": "Acorn Archimedes",
    "alias": "acorn-archimedes"
  },
  {
    "id": 4954,
    "name": "Acorn Electron",
    "alias": "acorn-electron"
  },
  {
    "id": 4911,
    "name": "Amiga",
    "alias": "amiga"
  },
  {
    "id": 4947,
    "name": "Amiga CD32",
    "alias": "amiga-cd32"
  },
  ...
]
```

### thegamesdb.getPlatformGames({ *id* }): *Array*
```javascript
thegamesdb.getPlatformGames({ id: 16 })
```
```json
[
  {
    "id": 33,
    "title": "Jet Set Radio",
    "releaseDate": "2000-07-28T23:00:00.000Z"
  },
  {
    "id": 195,
    "title": "Marvel vs. Capcom: Clash of Super Heroes",
    "releaseDate": "1998-02-12T00:00:00.000Z"
  },
  {
    "id": 200,
    "title": "Ikaruga",
    "releaseDate": "2002-10-04T23:00:00.000Z"
  },
  {
    "id": 420,
    "title": "Dino Crisis",
    "releaseDate": "2000-12-14T00:00:00.000Z"
  },
  ...
]
```

## License
MIT
