const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3');

//データベースオブジェクトの取得。
const db = new sqlite3.Database('mydb.db');

//GET処理
router.get('/', (req, res, next) => {
    db.serialize(() => {
        var rows = "";
        db.each("select * from mydata", (err, row) => {
            if (!err) {
                rows += "<tr><th>" + row.id + "</th><td>" + row.name + "</td></tr>";
            }
        }, (err, count) => {
            if(!err) {
                var data = {
                    title: 'Hello!',
                    content: rows
                };
                res.render('hello/index', data);
            }
        });
    });
});

//GET処理　Insert
router.get('/add', (req, res, next) => {
    var data = {
        title: 'Hello/add',
        content: '新しいレコードを入力'
    }
    res.render('hello/add', data);
});

//POST処理　Insert
router.post('/add', (req, res, next) => {
    const nm = req.body.name;
    const ml = req.body.mail;
    const ag = req.body.age;
    db.serialize(() => {
        db.run('Insert into mydata (name, mail, age) values (?, ?, ?)', nm, ml, ag);
    });
    res.redirect('/hello');
});

//GET処理　Select
router.get('/show', (req, res, next) => {
    const id = req.query.id;
    db.serialize(() => {
        const q = "select * from mydata where id = ?";
        db.get(q, [id], (err, row) => {
            if (!err) {
                var data = {
                    title: '/Hello/show',
                    content: 'id' + id + ' のレコード：',
                    mydata: row
                }
                res.render('hello/show', data);
            }
        });
    });
});

//GET処理　Update
router.get('/edit', (req, res, next) => {
    const id = req.query.id;
    db.serialize(() => {
        const q = 'select * from mydata where id = ?';
        db.get(q, [id], (err, row) => {
            if(!err) {
                var data = {
                    title: 'hello/edit',
                    content: 'id = ' + id + ' のレコードを編集する',
                    mydata: row
                }
                res.render('hello/edit', data);
            }
        });
    });
});

//POST処理　Update
router.post('/edit', (req, res, next) => {
    const id = req.body.id;
    const nm = req.body.name;
    const ml = req.body.mail;
    const ag = req.body.age;
    const q = "update mydata set name = ?, mail = ?, age = ? where id = ?";
    db.serialize(() => {
        db.run(q, nm, ml, ag, id);
    });
    res.redirect('/hello');
});


//GET処理　delete
router.get('/delete', (req, res, next) => {
    const id = req.query.id;
    db.serialize(() => {
        const q = 'select * from mydata where id = ?';
        db.get(q, [id], (err, row) => {
            if(!err) {
                var data = {
                    title: 'Hello/delete',
                    content: 'id = ' + id + 'のレコードを削除：',
                    mydata: row
                }
                res.render('hello/delete', data);
            }
        });
    });
});

//POST処理　delete
router.post('/delete', (req, res, next) => {
    const id = req.body.id;
    db.serialize(() => {
        const q = 'delete from mydata where id = ?'
        db.run(q, id);
    });
    res.redirect('/hello');
});



// const http = require('https');
// const parseString = require('xml2js').parseString;

//GoogleニュースのRSSページへのアクセスとデータ取得
// router.get('/', (req, res, next) => {
//     var opt = {
//         host: 'news.google.com',
//         port: 443,
//         path: '/rss?hl=ja&ie=UTF-8&oe=UTF-8&gl=JP&ceid=JP:ja'
//     };

//     http.get(opt, (res2) => {
//         var body = '';
//         res2.on('data', (data) => {
//             body += data;
//         });
//         res2.on('end', () => {
//             parseString(body.trim(), (err, result) => {
//                 console.log(result);
//                 var data = {
//                     title: 'Google News',
//                     content: result.rss.channel[0].item
//                 };
//                 res.render('hello', data);
//             });
//         });
//     });
// });

// router.get('/', (req, res, next) => {
//     var msg = '※何か書いて送信してください。';
//     if(req.session.message != undefined) {
//         msg = "Last Message:" + req.session.message
//     }
//     var data = {
//         title: 'Hello!',
//         content: msg
//     }
//     res.render('hello', data);
// });

// router.post('/post', (req, res, next) => {
//     var msg = req.body['message'];
//     req.session.message = msg;
//     var data = {
//         title: 'Hello!',
//         content: 'Last Message: ' + req.session.message
//     }
//     res.render('hello', data);
// });

module.exports = router;