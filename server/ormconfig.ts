module.exports = {
    type: 'postgres',
    url: process.env.DB_URL,
    logging: false,
    migrations: [process.env.MIGRATIONS],
};
