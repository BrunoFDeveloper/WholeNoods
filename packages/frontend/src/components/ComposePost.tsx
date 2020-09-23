import { useState } from 'react';
import Header from './shared/Header';
import Button from './shared/Button';
import Toggle from './shared/Toggle';
import { useNavigate } from 'react-router-dom';
import UploadFiles, { FileWithPreview } from './CreatePost/UploadFiles';
import { graphql, useMutation } from 'react-relay/hooks';
import { ComposePostMutation } from './__generated__/ComposePostMutation.graphql';

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

	async function createPost(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		commit({
			variables: {
				input: {
					title: formData.get('title') as string,
					text: formData.get('text') as string,
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
				<form onSubmit={createPost} className="flex flex-col space-y-4">
					<Header>New Post</Header>

					<label className="block text-sm font-medium leading-5 text-gray-700">
						Post Title
						<div className="mt-1 relative rounded-md shadow-sm">
							<input
								name="title"
								className="form-input block w-full sm:text-sm sm:leading-5"
								placeholder="Title..."
							/>
						</div>
					</label>

					<label className="block text-sm font-medium leading-5 text-gray-700">
						Post Text
						<div className="mt-1 relative rounded-md shadow-sm">
							<textarea
								name="text"
								rows={3}
								className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
							/>
						</div>
					</label>

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
				</form>
			</div>
		</div>
	);
}
