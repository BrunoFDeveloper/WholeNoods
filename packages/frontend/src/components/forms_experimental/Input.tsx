import clsx from 'clsx';
import { ComponentProps } from 'react';
import { unstable_FormInput as FormInput } from 'reakit';
import { useFormContext } from './FormContext';
import Label from './Label';
import GradBar from '../ui/GradBar';

type Props = {
	label: string;
	name: string;
} & ComponentProps<'input'>;

export default function Input({ label, name, ...props }: Props) {
	const form = useFormContext();
	return (
		<div>
			<Label name={name}>{label}</Label>
			<FormInput
				{...form}
				{...props}
				name={name}
				className={clsx(
					'form-input block w-full sm:text-sm sm:leading-5 border-0 rounded rounded-b-none text-gray-900',
					props.disabled && 'bg-gray-100',
				)}
			/>
			<GradBar />
		</div>
	);
}
