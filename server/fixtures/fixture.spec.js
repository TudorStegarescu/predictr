var frisby = require('frisby');

frisby.create('API: List bookmarks')
      .get('http://localhost:3000/api/fixtures')
      .expectStatus(200)
      .toss();
