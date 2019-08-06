var Book = require('./book.js');
var BookCRUD = require('./bookCRUD.js');

BookCRUD1 = new BookCRUD();

//BookCRUD1.located();

Book1 = new Book(32, "marauder123", "marauder123");

//BookCRUD1.create(Book1);

// BookCRUD1.update(Book1);

// BookCRUD1.selectAll(function(err, rows){

// 	console.log(rows);

// });

// console.log(BookCRUD1.search_parts_apply("teste asd abc int123", 'keywords'));

BookCRUD1.searchByAll( function(err, rows){ console.log(rows);}, new Book(null, "teste", "marauder123") );