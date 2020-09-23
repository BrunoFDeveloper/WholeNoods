import {
  useForm,
  FormProvider,
  DeepPartial,
  UnpackNestedValue,
  SubmitHandler,
} from "react-hook-form";
import DisabledContext from "./utils/DisabledContext";

export type Values = Record<string, any>;

type Props<T> = {
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  disabled?: boolean;
  defaultValues?: UnpackNestedValue<DeepPartial<T>>;
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit">;

export default function Form<T = Values>({
  children,
  onSubmit,
  defaultValues,
  autoComplete,
  disabled = false,
  ...props
}: Props<T>) {
  const form = useForm<T>({
    defaultValues,
    // TODO: Look into if this is really what we want, or if we want it to
    // be defined form-by-form.
    mode: "onChange",
  });

  return (
    <DisabledContext.Provider value={disabled}>
      <FormProvider {...form}>
        <form
          autoComplete={autoComplete ?? "off"}
          onSubmit={form.handleSubmit(onSubmit)}
          {...props}
        >
          {children}
        </form>
      </FormProvider>
    </DisabledContext.Provider>
  );
}
