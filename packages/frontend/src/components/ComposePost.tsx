import { useState } from 'react';
import Header from './shared/Header';
import Button from './ui/Button';
import Toggle from './shared/Toggle';
import Form, { Values } from './forms/Form';
import Input from './forms/Input';
import { useNavigate } from 'react-router-dom';
import UploadFiles, { FileWithPreview } from './CreatePost/UploadFiles';
import { graphql, useMutation } from 'react-relay/hooks';
import { ComposePostMutation } from './__generated__/ComposePostMutation.graphql';
import TextArea from './ui/TextArea';

export default function ComposePost() {
	const navigate = useNavigate();
	const [isPublic, setIsPublic] = useState(false);
	const [isPreview, setIsPreview] = useState(true);
	const [files, setFiles] = useState<FileWithPreview[]>([]);

	const [commit] = useMutation<ComposePostMutation>(graphql`
		mutation ComposePostMutation($input: CreatePostInput!) {
			createPost(input: $input) {
				id
			}
		}
	`);

	async function createPost(values: Values) {
		commit({
			variables: {
				input: {
					title: values.title,
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
			<div className="max-w-lg mx-auto bg-gray-200 p-8 rounded">
				<Form onSubmit={createPost} className="flex flex-col space-y-4">
					<Header>New Post</Header>

					<Input label="Post Title" name="title" />

					<TextArea label="Post Text" name="text" />

					<label className="text-sm font-medium leading-5 text-gray-700 flex items-center justify-between">
						Public Post
						<Toggle
							checked={isPublic}
							onChange={() => setIsPublic(!isPublic)}
						/>
					</label>

					{!isPublic && (
						<label className="text-sm font-medium leading-5 text-gray-700 flex items-center justify-between">
							Preview Post For Public
							<Toggle
								checked={isPreview}
								onChange={() => setIsPreview(!isPreview)}
							/>
						</label>
					)}

					<UploadFiles files={files} setFiles={setFiles} />

					<div className="mt-4 flex justify-end">
						<Button type="submit">Create Post</Button>
					</div>
				</Form>
			</div>
		</div>
	);
}
