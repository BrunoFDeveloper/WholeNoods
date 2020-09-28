import { useState } from 'react';
import Button from '../ui/Button';
import Form, { Values } from '../forms/Form';
import Input from '../forms/Input';
import { useNavigate } from 'react-router-dom';
import UploadFiles, { FileWithPreview } from './UploadFiles';
import { graphql, useMutation } from 'react-relay/hooks';
import TextArea from '../forms/TextArea';
import Switch from '../forms/Switch';
import Heading from '../ui/Heading';
import { CreatePostMutation } from './__generated__/CreatePostMutation.graphql';
import Computed from '../forms/Computed';

export default function CreatePost() {
	const navigate = useNavigate();
	const [isPublic, setIsPublic] = useState(false);
	const [isPreview, setIsPreview] = useState(true);
	const [files, setFiles] = useState<FileWithPreview[]>([]);

	const [commit] = useMutation<CreatePostMutation>(graphql`
		mutation CreatePostMutation($input: CreatePostInput!) {
			createPost(input: $input) {
				id
			}
		}
	`);

	async function createPost(values: Values) {
		commit({
			variables: {
				input: {
					text: values.text,
					visibility: isPublic
						? 'PUBLIC'
						: isPreview
						? 'PRIVATE_PREVIEW'
						: 'PRIVATE',
					media: files,
				},
			},
			onCompleted(data) {
				navigate(`/posts/${data.createPost.id}`);
			},
		});
	}

	return (
		<div className="container mx-auto mt-6">
			<div className="max-w-lg mx-auto p-8">
				<Form
					defaultValues={{
						isPublic: false,
						isPreview: true,
					}}
					onSubmit={createPost}
					className="flex flex-col space-y-4"
				>
					<Heading>Upload.</Heading>

					<TextArea label="Post Text" name="text" />

					<Switch label="Public Post" name="isPublic" />

					<Computed keys={['isPublic']}>
						{({ isPublic }) =>
							!isPublic && (
								<Switch label="Preview Post For Public" name="isPreview" />
							)
						}
					</Computed>

					<UploadFiles files={files} setFiles={setFiles} />

					<div className="mt-4 flex justify-end">
						<Button type="submit">Create Post</Button>
					</div>
				</Form>
			</div>
		</div>
	);
}
