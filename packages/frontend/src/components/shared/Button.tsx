type Props = {
  children: React.ReactNode;
} & React.ComponentProps<"button">;

export default function Button({ children, ...props }: Props) {
  return (
    <button
      className="text-white bg-green-600 bg-transparent transition duration-150 rounded focus:outline-none px-5 py-2 text-lg font-semibold"
      {...props}
    >
      {children}
    </button>
  );
}
