import { Footer } from "../footer";
import { Navbar } from "../navbar";

function Page(props: React.PropsWithChildren) {
	return (
		<>
			<Navbar />
			<main className="mt-12 flex h-[calc(100vh-80px)] w-screen justify-center">
				{props.children}
			</main>
			<Footer />
		</>
	);
}

export { Page };
