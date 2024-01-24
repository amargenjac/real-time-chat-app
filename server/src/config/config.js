module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'your_db_name',
        user: process.env.USER || 'your_db_user',
        password: process.env.PASSWORD || 'your_db_password',
        host: process.env.DB_PORT || '3306',
        options: {
            host: process.env.HOST || 'localhost',
            dialect: process.env.DIALECT || 'mysql',
        }
    },
    jwtSecret: process.env.JWTSECRET || 'jwtSecret'
}