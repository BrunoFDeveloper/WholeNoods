import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	CreateDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { validateOrReject } from 'class-validator';

// TODO: Add versions of both of these supporting soft deletes.

/**
 * An entity that is never exposed externally.
 */
export abstract class InternalEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	readonly id!: string;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt!: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt!: Date;

	@BeforeInsert()
	@BeforeUpdate()
	async validate() {
		await validateOrReject(this);
	}
}

/**
 * An entity that is exposed via GraphQL.
 */
@ObjectType()
export abstract class ExternalEntity extends BaseEntity {
	// static async findAndPaginate<T extends ExternalEntity = ExternalEntity>(
	//     partialOptions: FindManyOptions<T>,
	//     args: LimitOffsetArgs,
	// ) {
	//     if (typeof partialOptions.where !== 'object') {
	//         throw new Error('Where must be an object');
	//     }

	//     // NOTE: I use any here because I am lazy:
	//     const where: any = {
	//         ...partialOptions.where,
	//     };

	//     const records = await this.find<T>({
	//         ...partialOptions,
	//         where,
	//         order: {
	//             ...partialOptions.order,
	//             createdAt: 'DESC',
	//             id: 'DESC',
	//         },
	//         // NOTE: We need to load one extra record to see if there's a next page or not.
	//         take: args.limit + 1,
	//         skip: args.offset,
	//     });

	//     const hasNextPage = records.length > args.limit;

	//     return {
	//         pageInfo: {
	//             hasNextPage,
	//             hasPreviousPage: !!args.offset,
	//             startCursor: null,
	//             endCursor: null,
	//         },
	//         edges: records.slice(0, args.limit).map(node => ({
	//             node,
	//             cursor: Cursor.serialize(node.createdAt),
	//         })),
	//     } as Relay.Connection<T>;
	// }

	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	readonly id!: string;

	@Field()
	@CreateDateColumn()
	createdAt!: Date;

	@Field()
	@UpdateDateColumn()
	updatedAt!: Date;

	@BeforeInsert()
	@BeforeUpdate()
	async validate() {
		await validateOrReject(this);
	}
}
