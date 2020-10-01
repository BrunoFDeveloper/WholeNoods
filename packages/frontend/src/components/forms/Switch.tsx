import { Controller, useFormContext } from 'react-hook-form';
import Switch, { Props } from '../ui/Switch';

export default function FormSwitch(props: Omit<Props, 'checked' | 'onToggle'>) {
	const form = useFormContext();

	return (
		<Controller
			control={form.control}
			name={props.name}
			render={({ onChange, onBlur, value }) => {
				console.log({ value });
				return <Switch {...props} checked={value} onToggle={() => onChange(!value)} />
			}}
		/>
	);
}
