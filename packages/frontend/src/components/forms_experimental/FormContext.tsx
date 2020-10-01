import { createContext, useContext } from 'react';
import { unstable_FormStateReturn as FormStateReturn } from 'reakit';

export const FormContext = createContext<FormStateReturn<any> | null>(null);

export function useFormContext() {
	const form = useContext(FormContext);

	if (!form) {
		throw new Error('Not contained within a form.');
	}

	return form;
}
