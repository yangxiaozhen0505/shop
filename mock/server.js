
let http = require('http');
let fs = require('fs');
let url = require('url');
let sliders = require('./sliders');
function read(cb) {
  fs.readFile('./book.json', 'utf-8', function (err, data) {
    data = data.length === 0 ? [] : JSON.parse(data);
    cb(data)
  });
}
function write(data, cb) {
  fs.writeFile('./book.json', JSON.stringify(data), cb)
}
read(function(data){
  console.log(data);
});
http.createServer(function (req, res) {
  let {pathname, query} = url.parse(req.url, true);
  let id = query.id;
  if (pathname === '/api/slider') {
    return res.end(JSON.stringify(sliders));

  }
  if (pathname === '/api/hot') {
    read(function (data) {
      var books = data.reverse().slice(0, 6);
        res.end(JSON.stringify(books))
    });
    return
  }
  if (pathname === '/api/book') {
    switch (req.method) {
      case 'GET':
        if (id) {  //获取一本图书
          read(function (books) {
            let book = books.find(item => item.id == id);
            res.end(JSON.stringify(book))
          })
        } else {
          read(function (data) {
            res.end(JSON.stringify(data))
          });
        }
        break;
      case 'POST':
        var str = '';
        req.on('data', function (data) {
          str += data;
        });
        req.on('end', function () {
          var book = JSON.parse(str);
          read(function (books) {
            book.id = books.length > 0 ? books[books.length - 1].id + 1 : 1;
            books.push(book);
            write(books, function () {
              res.end(JSON.stringify(book))
            })
          })
        });
        break;
      case 'DELETE':
        read(function (books) {
          books = books.filter(item => id != item.id);
          write(books, function () {
            res.end(JSON.stringify({}))
          });
        });
        break;
      case 'PUT':
        var str = '';
        req.on('data',function (data) {
          str += data
        });
        req.on('end',function () {
          let book = JSON.parse(str);
          read(function (books) {
            books = books.map(item=>{
              if(item.id == id){
                return book;
              }
              return item
            });
            write(books,function () {
              res.end(JSON.stringify(book))
            })
          })
        });
        break;
    }
  }
}).listen(3000);
