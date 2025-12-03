var express = require('express');
var router = express.Router();''

const ps = require('@prisma/client');
const prisma = new ps.PrismaClient();

router.get('/', (req, res, next) => {
  const id = +req.query.id;
  if (!id) {
    prisma.user.findMany().then(users => {
      const data = {
        title: 'Users/Index',
        content: users
      }
      res.render('users/index', data);
    });
  } else {
    prisma.user.findMany({
      where: { id: {lte : id}}
    }).then(usrs => {
      var data  = {
        title: 'Users/index',
        content: usrs

      }
      res.render('users/index', data);
    });
  }
});

router.get('/find', (req, res, next) => {
  const name = req.query.name;
  prisma.user.findMany({
    where: {name: { contains : name }}
  }).then(usrs => {
    var data = {
      title: 'Users/Find',
      content: usrs
    }
    res.render('users/find', data);
  })
});

router.get('/add', (req, res, next) => {
  const data = {
    title: '/Users/Add'
  }
  res.render('users/add', data);
});

router.post('/add', (req, res, next) => {
  prisma.user.create({
    data: {
      name: req.body.name,
      pass: req.body.pass,
      mail: req.body.mail,
      age: +req.body.age
    }
  })
  .then(() => {
    res.redirect('/users');
  });
});


module.exports = router;
