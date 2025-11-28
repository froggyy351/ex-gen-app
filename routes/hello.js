const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3');

//データベースオブジェクトの取得
const db = new sqlite3.Database('mydb.db');

//GETアクセスの処理
router.get('/', (req, res, next) => {
    db.serialize(() => {
        //レコードをすべて取り出す
        db.all("select * from mydata", (err, rows) => {
            //データベースアクセス完了時の処理
            if (!err) {
                var data = {
                    title: 'Hello!',
                    content: rows
                };
                res.render('hello', data);
            }
        });
    });
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