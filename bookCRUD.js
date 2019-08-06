class BookCRUD{

	constructor(){

		this.sqlite3 = require('sqlite3');
		this.sqliteBase = new this.sqlite3.Database('./Book.sqlite');
		//this.verifyIfisMounted();
	}


	verifyIfisMounted(){

		try{
			this.sqliteBase.run('CREATE TABLE Book (id INTEGER PRIMARY KEY, body TEXT, keywords TEXT)')
		}catch(e){
			console.log('Tabela Book existe');
		}

	}

	create(Book){

		this.create_stmt = this.sqliteBase.prepare("INSERT INTO Book(body, keywords) VALUES (?, ?)");
		this.create_stmt.run(Book.body, Book.keywords);
		this.create_stmt.finalize();

	}

	selectAll(execute){
		return this.sqliteBase.all("select * from Book", [], execute);
	}

	update(Book){

		this.create_stmt = this.sqliteBase.prepare("UPDATE Book set body = ?, keywords = ? where id = ?");
		this.create_stmt.run(Book.body, Book.keywords, Book.id);
		this.create_stmt.finalize();

	}

	searchByBody(execute, Book){

		var parts = this.search_parts(Book.body, "body");

		return this.sqliteBase.all("select * from Book where " + parts, [], execute);

	}

	searchByKeywords(execute, Book){

		var parts = this.search_parts(Book.keywords, "keywords");

		return this.sqliteBase.all("select * from Book where " + parts, [], execute);

	}

	searchByAll(execute, Book){

		var partsKeywords = this.search_parts(Book.keywords, "keywords");
		var partsBody = this.search_parts(Book.body, "body");

		var parts = partsKeywords + " OR " + partsBody;

		return this.sqliteBase.all("select * from Book where " + parts, [], execute);
	}

	search_parts(textToSearch, field ,delimitator = " "){

		var result = [];

		var parts = textToSearch.split(delimitator);

		for(var i = 0; i < parts.length; i++){

			result.push(field + " like '%" + parts[i] + "%'");

		}

		return result.join(" OR ");		

	}

}

module.exports = BookCRUD;