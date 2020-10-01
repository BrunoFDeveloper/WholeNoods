module.exports = {
	type: 'postgres',
	url: process.env.DATABASE_URL,
	synchronize: true,
	logging: false,
	entities: ['src/entities/**/*.ts'],
	migrations: ['src/migration/**/*.ts'],
	subscribers: ['src/subscriber/**/*.ts'],
	cli: {
		entitiesDir: 'src/entities',
		migrationsDir: 'src/migration',
		subscribersDir: 'src/subscriber',
	},
};
