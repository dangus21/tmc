import { Footer } from "../footer";
import { Navbar } from "../navbar";

function Page(props: React.PropsWithChildren) {
	return (
		<>
			<Navbar />
			{props.children}
			<Footer />
		</>
	);
}

export { Page };
