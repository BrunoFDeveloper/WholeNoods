import {
	unstable_useFormState as useFormState,
	unstable_Form as Form,
	unstable_FormLabel as FormLabel,
	unstable_FormInput as FormInput,
	unstable_FormMessage as FormMessage,
	unstable_FormSubmitButton as FormSubmitButton,
} from 'reakit/Form';
import { FormContext } from './FormContext';
import Input from './Input';

export function FormContainer() {
	const form = useFormState({
		// values: { name: '' },
		onValidate: (values) => {
			if (!values.name) {
				const errors = {
					name: 'How can we be friends without knowing your name?',
				};
				throw errors;
			}
		},
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<FormContext.Provider value={form}>
			<Form {...form}>
				<Input name="name" label="Name" />
				<FormSubmitButton {...form}>Submit</FormSubmitButton>
			</Form>
		</FormContext.Provider>
	);
}
