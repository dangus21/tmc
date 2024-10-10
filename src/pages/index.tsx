import { Page } from "@/components";
import { useEffect } from "react";
import { useSeguradoraState } from "@/store";
import Head from "next/head";

export default function Home() {
	const { tables } = useSeguradoraState();
	useEffect(() => {
		tables.getTables();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Head>
				<title>Seguradora S.A. - Home</title>
			</Head>
			<Page>Content</Page>
		</>
	);
}
