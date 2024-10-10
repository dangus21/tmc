import { detectDataType, splitIntoChunks } from "@/utils";
import XLSX from "xlsx";
import path from "node:path";
import type { NextApiRequest, NextApiResponse } from "next";

export type Table = {
	headers: [string, string][];
	values: [number, [string, string][]][];
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ data: Table }>
) {
	const { table } = req.query;
	if (!table || typeof table !== "string") {
		res.status(400).json({ data: { headers: [], values: [] } });
		return;
	}

	const currentXLSXFile = path.resolve(path.join("./public/tables", table));

	try {
		const workbook = XLSX.readFile(currentXLSXFile);
		const worksheet = workbook.Sheets.Folha1;

		if (worksheet["!ref"]) {
			delete worksheet["!ref"];
		}

		if (worksheet["!margins"]) {
			delete worksheet["!margins"];
		}

		const worksheetEntries = Object.entries(worksheet);
		const worksheetMaxSide = Math.floor(Math.sqrt(worksheetEntries.length));

		const chunkedWorksheet = splitIntoChunks(
			worksheetEntries,
			worksheetMaxSide
		);

		const mappedWorksheet: [string, string][][] = chunkedWorksheet.map(
			(chunk) =>
				chunk.map((element): [string, string] => {
					const [, cell] = element as [string, XLSX.CellObject];
					const value = cell.w || "";
					return [value, detectDataType(value)];
				})
		);

		const transformedData: Table = mappedWorksheet.reduce<Table>(
			(
				result: Table,
				current: [string, string][],
				index: number
			): Table => {
				if (index === 0) {
					// Handle headers
					return {
						...result,
						headers: current
					};
				}
				// Handle data rows
				return {
					...result,
					values: [...result.values, [index - 1, current]]
				};
			},
			{ headers: [], values: [] }
		);

		res.status(200).json({ data: transformedData });
	} catch (error) {
		console.error("Error processing XLSX file:", error);
		res.status(500).json({ data: { headers: [], values: [] } });
	}
}
