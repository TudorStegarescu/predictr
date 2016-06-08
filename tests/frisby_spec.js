var frisby = require('frisby');

frisby.create('API: List bookmarks')
      .get('http://localhost:8000/api/users')
      .expectStatus(200)
      .toss();
