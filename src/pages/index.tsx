import { Page } from "@/components";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { useSeguradoraState } from "@/store";
import Head from "next/head";

export default function Home() {
	const { tables } = useSeguradoraState();

	useEffect(() => {
		tables.getTables();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [editMode, setEditMode] = useState<boolean>(false);

	return (
		<>
			<Head>
				<title>Seguradora S.A. - Home</title>
			</Head>
			<Page>
				<>
					<div>
						<button onClick={() => setEditMode((prev) => !prev)}>
							{editMode ? "Confirm" : "Edit"}
						</button>
						<button></button>
						<button></button>
					</div>
					{tables.table.headers.length > 0 ? (
						<div className="flex w-3/4 flex-col flex-wrap content-center pt-4">
							<div className="flex w-3/4 pt-4">
								{tables.table.headers.map(([header], index) => (
									<h1
										key={`${header}-${index}`}
										style={{
											width: `calc(100% / ${tables.table.headers.length})`
										}}
										className={twMerge(
											index > 0 && "place-content-end",
											"-m-[0.5px] flex border p-2 text-lg font-semibold transition-all hover:bg-sky-700/10"
										)}
									>
										{header}
									</h1>
								))}
							</div>
							{tables.table.values.map(
								(
									[lineNumber, lineValues],
									tableValuesIndex
								) => (
									<div
										className="flex w-3/4 flex-row"
										key={`${lineNumber}-${tableValuesIndex}`}
									>
										{lineValues.map(
											(
												[value, valueType],
												valueIndex
											) => {
												const lineId = `${lineNumber}-${tableValuesIndex}`;

												return editMode ? (
													<input
														key={`${lineNumber}-${valueIndex}`}
														style={{
															width: `calc(100% / ${tables.table.headers.length})`
														}}
														className={twMerge(
															valueIndex > 0 &&
																"text-end",
															"text-md -m-[0.5px] flex border p-2 transition-all hover:bg-sky-700/5"
														)}
														defaultValue={value}
													/>
												) : (
													<p
														key={`${lineNumber}-${valueIndex}`}
														style={{
															width: `calc(100% / ${tables.table.headers.length})`
														}}
														className={twMerge(
															valueIndex > 0 &&
																"place-content-end",
															"text-md -m-[0.5px] flex border p-2 transition-all hover:bg-sky-700/5"
														)}
													>
														{value}
													</p>
												);
											}
										)}
									</div>
								)
							)}
						</div>
					) : (
						<div className="grid h-96 w-96 place-items-center">
							<h1>Please select a table above</h1>
						</div>
					)}
				</>
			</Page>
		</>
	);
}
