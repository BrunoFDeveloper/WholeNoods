import { ReactNode } from 'react';
import { unstable_FormLabel as FormLabel } from 'reakit';
import { useFormContext } from './FormContext';

type Props = {
	name: string;
	children: ReactNode;
};

export default function Label({ name, children }: Props) {
	const form = useFormContext();

	return (
		<FormLabel
			{...form}
			name={name}
			className="block text-sm font-medium leading-5 text-gray-100 mb-1"
		>
			{children}
		</FormLabel>
	);
}
