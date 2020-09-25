import { createConnection } from 'typeorm';
import { createThread, createUser } from './utils/createEntities';

async function main() {
	await createConnection(require('../../ormconfig.js'));

	const tru = await createUser('tru');
	const vjj = await createUser('vjj', {
		bio: 'I created this site, what else do you want to know?',
	});

	await createThread(vjj, tru);
}

main();
