import 'reflect-metadata';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import depthLimit from 'graphql-depth-limit';
import {
	simpleEstimator,
	getComplexity,
	fieldExtensionsEstimator,
} from 'graphql-query-complexity';
import { ApolloServer } from 'apollo-server-koa';
import { AuthChecker, buildSchema } from 'type-graphql';
import { createConnection, getConnection } from 'typeorm';
import resolvers from './resolvers';
import { User } from './entities/User';
import { Context, KoaContext } from './types';
import { ApolloServerLoaderPlugin } from 'type-graphql-dataloader';
import { run } from './utils/currentRequest';
import {
	COOKIE_NAME,
	COOKIE_SECRET,
	IS_PROD,
	MAX_COMPLEXITY,
	MAX_DEPTH,
} from './config';
import { Session } from './entities/Session';

const GRAPHQL_PATH = '/api/graphql';

async function main() {
	await createConnection(require('../ormconfig.js'));

	const authChecker: AuthChecker<Context> = (
		{ root, args, context, info },
		roles,
	) => {
		if (context.user) {
			return true;
		}
		return false;
	};

	const schema = await buildSchema({
		resolvers,
		emitSchemaFile: true,
		authChecker,
	});

	const app = new Koa();

	app.keys = [COOKIE_SECRET];

	app.use(
		session(
			{
				key: COOKIE_NAME,
				maxAge: 86400000 * 14,
				overwrite: true,
				httpOnly: true,
				signed: true,
				rolling: true,
				renew: false,
				secure: IS_PROD,
				store: {
					// TODO: Verify that this session handling is truely sufficient:
					async get(key, maxAge, { rolling }) {
						const session = await Session.findOne(key);
						return session?.data ?? false;
					},
					async set(key, sess, maxAge: number, { rolling, changed }) {
						const session =
							(await Session.findOne(key)) || Session.create({ key });

						session.expiration = new Date(Date.now() + maxAge);
						session.data = sess;

						await session.save();
					},
					async destroy(key) {
						await Session.delete(key);
					},
				},
			},
			app,
		),
	);

	app.use(async (ctx: KoaContext, next) => {
		ctx.context = {
			ctx,
			user: await User.fromSession(ctx),
		};

		await run(ctx.context, next);
	});

	app.use(bodyParser());

	const server = new ApolloServer({
		schema,
		debug: true,
		uploads: true,
		plugins: [
			// @ts-ignore: There's a type mis-match here:
			ApolloServerLoaderPlugin({
				typeormGetConnection: getConnection,
			}),
			{
				requestDidStart: () => ({
					didResolveOperation({ request, document }) {
						const complexity = getComplexity({
							schema,
							operationName: request.operationName,
							query: document,
							variables: request.variables,
							estimators: [
								fieldExtensionsEstimator(),
								simpleEstimator({ defaultComplexity: 1 }),
							],
						});

						if (complexity > MAX_COMPLEXITY) {
							throw new Error(`GraphQL query was too complex (${complexity}).`);
						}

						console.log('Used query complexity points:', complexity);
					},
				}),
			},
		],
		async context({ ctx }): Promise<Context> {
			return ctx.context;
		},
		validationRules: [depthLimit(MAX_DEPTH)],
	});

	app.use((ctx, next) => {
		if (ctx.method.toLowerCase() !== 'post' || ctx.path !== GRAPHQL_PATH) {
			return next();
		}

		const { body } = ctx.request;

		if (IS_PROD && (body.query || !body.id)) {
			ctx.body = {
				errors: [{ message: 'Only persisted queries are permitted.' }],
			};
			ctx.status = 400;
			return;
		}

		if (body.id) {
			body.query = require('../persisted-queries.json')[body.id];
		}

		return next();
	});

	server.applyMiddleware({ app, path: GRAPHQL_PATH });

	app.listen(4000, () => {
		console.log('Apollo server running on port 4000.');
	});
}

main();
