type Props = {
	children: React.ReactNode;
};

export default function Heading({ children }: Props) {
	return <h1 className="font-bold text-6xl mb-6 italic text-white">{children}</h1>;
}
