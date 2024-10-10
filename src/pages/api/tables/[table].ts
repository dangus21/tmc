// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import XLSX from "xlsx";
import path from "node:path";
import type { NextApiRequest, NextApiResponse } from "next";
type Table =
	| {
			title: string;
			values: string[];
	  }[]
	| [];

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<{ data: Table }>
) {
	const { table } = req.query;
	if (!table) {
		res.status(400);
		return;
	}

	const currentXLSXFile = path.resolve(
		path.join("./public/tables", table?.toString())
	);

	const workbook = XLSX.readFile(currentXLSXFile);
	const worksheet = workbook.Sheets.Folha1;
	console.log("LOG ~ worksheet:", worksheet);

	if (worksheet["!ref"]) {
		delete worksheet["!ref"];
	}

	if (worksheet["!margins"]) {
		delete worksheet["!margins"];
	}
	const worksheetEntries = Object.entries(worksheet);
	const worksheetMaxSide = Math.sqrt(worksheetEntries.length);

	function splitIntoChunks<T>(array: T[], chunkSize: number = 4): T[][] {
		return array.reduce((resultArray: T[][], item: T, index: number) => {
			const chunkIndex = Math.floor(index / chunkSize);

			if (!resultArray[chunkIndex]) {
				resultArray[chunkIndex] = []; // Start a new chunk
			}

			resultArray[chunkIndex].push(item);
			return resultArray;
		}, []);
	}

	const chunkedWorksheet = splitIntoChunks(
		worksheetEntries,
		worksheetMaxSide
	);

	const mappedWorksheet = chunkedWorksheet.map((chunk) =>
		chunk.map(
			(element) =>
				(
					element as unknown as Record<string, Record<string, string>>
				)[1].w
		)
	);

	const transformedData = mappedWorksheet[0].map((title, index) => ({
		title,
		values: mappedWorksheet.slice(1).map((row) => row[index])
	}));

	res.status(200).json({ data: transformedData });
}
