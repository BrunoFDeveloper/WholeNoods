import { createConnection } from 'typeorm';
import { createThread, createUser } from './utils/createEntities';

async function main() {
	await createConnection(require('../../ormconfig.js'));

	const tru = await createUser('tru', {
		avatarUrl: 'https://github.com/tnarla.png',
	});
	const vjj = await createUser('vjj', {
		bio: 'I created this site, what else do you want to know?',
		avatarUrl: 'https://github.com/kesne.png',
	});

	try {
		const application = await vjj.applyToCreator();
		await application.approve();
	} catch (e) {
		console.log('Application failed: ', e);
	}

	await createThread(vjj, tru);
}

main();
