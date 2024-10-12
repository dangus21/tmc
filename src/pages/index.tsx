import { Button } from "@/components/ui/button";
import { Page } from "@/components";
import { componentForDataType } from "@/lib/utils";
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
	const isTableLoaded = tables.table.headers.length > 0;
	const currentlyDisplayedTable = editMode ? tables.tableEdit : tables.table;
	const headersAmount = currentlyDisplayedTable.headers.length;

	useEffect(() => {
		setEditMode(false);
	}, [tables.value]);

	return (
		<>
			<Head>
				<title>Seguradora S.A. - Home</title>
			</Head>
			<Page>
				<div className="flex w-full flex-col items-center pt-4">
					<div className="flex w-3/4 justify-between">
						<Button
							className="w-20"
							disabled={!isTableLoaded || editMode}
							onClick={() =>
								!editMode && setEditMode((prev) => !prev)
							}
						>
							Edit
						</Button>
						<div className="flex gap-2">
							<Button
								disabled={!isTableLoaded || !editMode}
								onClick={() => editMode && tables.insertRow()}
							>
								Add row
							</Button>
							<Button
								disabled={!isTableLoaded || !editMode}
								onClick={() => {
									if (editMode) {
										setEditMode((prev) => !prev);
										tables.discardChanges();
									}
								}}
							>
								Discard
							</Button>
							<Button
								disabled={!isTableLoaded || !editMode}
								onClick={() => {
									if (editMode) {
										setEditMode((prev) => !prev);
										tables.confirmChanges();
									}
								}}
							>
								Confirm
							</Button>
						</div>
					</div>
					{isTableLoaded ? (
						<div className="flex w-3/4 flex-col flex-wrap content-center pt-4">
							<div className="flex w-full pt-4">
								{currentlyDisplayedTable.headers.map(
									([header], index) => (
										<p
											key={`${header}-${index}`}
											style={{
												width: `calc(100% / ${currentlyDisplayedTable.headers.length})`
											}}
											className={twMerge(
												index > 0 &&
													"place-content-end",
												editMode
													? "shadow-[inset_0px_0px_0px_1px_#1a202c]"
													: "shadow-[inset_0px_0px_0px_0.5px_#e2e8f0]",
												"-m-[0.5px] flex p-2 text-lg font-semibold transition-all hover:bg-primary/10"
											)}
										>
											{header}
										</p>
									)
								)}
							</div>
							{currentlyDisplayedTable.values.map(
								(
									[lineNumber, lineValues],
									tableValuesIndex
								) => (
									<div
										className="flex w-full flex-row"
										key={`${lineNumber}-${tableValuesIndex}`}
									>
										{lineValues.map(
											([value, valueType], valueIndex) =>
												editMode ? (
													componentForDataType({
														dataType: valueType
															? valueType
															: currentlyDisplayedTable
																	.dataTypes[
																	valueIndex
																],
														props: {
															headersAmount,
															lineNumber,
															value,
															valueIndex,
															onChange:
																tables.editRow
														}
													})
												) : (
													// <input
													// 	key={`${lineNumber}-${valueIndex}`}
													// 	style={{
													// 		width: `calc(100% / ${currentlyDisplayedTable.headers.length})`
													// 	}}
													// 	className={twMerge(
													// 		valueIndex > 0 &&
													// 			"text-end",
													// 		"text-md -m-[0.5px] flex p-2 shadow-[inset_0px_0px_0px_1px_#1a202c] transition-all hover:bg-primary/5"
													// 	)}
													// 	defaultValue={value}
													// />
													<p
														key={`${lineNumber}-${valueIndex}`}
														style={{
															width: `calc(100% / ${currentlyDisplayedTable.headers.length})`
														}}
														className={twMerge(
															valueIndex > 0 &&
																"place-content-end",
															"text-md -m-[0.5px] flex h-14 px-2 py-4 shadow-[inset_0px_0px_0px_0.5px_#e2e8f0] transition-all hover:bg-primary/5"
														)}
													>
														{value}
													</p>
												)
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
				</div>
			</Page>
		</>
	);
}
