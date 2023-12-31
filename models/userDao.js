//models/userDao.js

const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
	type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
	//   myDataSource.destroy();
  });

const createUser = async ( id, name, email, password ) => {
	try {
		return await myDataSource.query(
		`INSERT INTO users(
			id,
			name,
			email,
			password
		) VALUES (?, ?, ?, ?);
		`,
		[ id, name, email, password ]
	  );
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

const selectUser = async (id) =>{
	try{
		return await myDataSource.query(`
			select * from users
			where id = ?
		`,[id]
		);
	}catch(err){
		const errror = new Error('Error');
		error.statusCode = 500;
		throw error;
	}
}

module.exports = {
  createUser, selectUser
}

