import { useFormContext, useWatch } from 'react-hook-form';

type Props = {
	keys: string[];
	children(values: Record<string, any>): React.ReactNode;
};

export default function Computed({ keys, children }: Props) {
	const form = useFormContext();

	const values = useWatch({
		control: form.control,
		name: keys,
	});

	return <>{children(values)}</>;
}
