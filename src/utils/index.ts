import dayjs from "dayjs";

type TypeOutput = "string" | "date" | "boolean" | "currency";
function extractNumber(str: string): number | boolean {
	const cleaned = str.replace(/[^\d.,]/g, "");
	const normalized = cleaned.replace(",", ".");
	const number = parseFloat(normalized);

	if (isNaN(number)) {
		return false;
	}

	return number;
}
function detectDataType(input: string): TypeOutput {
	if (dayjs(input).isValid()) {
		return "date";
	}
	if (["yes", "no"].includes(input.toLocaleLowerCase())) {
		return "boolean";
	}
	if (extractNumber(input)) {
		return "currency";
	}
	return "string";
}

function splitIntoChunks<T>(array: T[], chunkSize: number): T[][] {
	return array.reduce((resultArray: T[][], item: T, index: number) => {
		const chunkIndex = Math.floor(index / chunkSize);

		if (!resultArray[chunkIndex]) {
			resultArray[chunkIndex] = []; // Start a new chunk
		}

		resultArray[chunkIndex].push(item);
		return resultArray;
	}, []);
}

export { detectDataType, splitIntoChunks };
