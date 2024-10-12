import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

import { DatePicker } from "@/components/ui/datepicker";
import dayjs from "dayjs";

export type TypeOutput = "string" | "date" | "boolean" | "currency";
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

function componentForDataType({
	dataType,
	props
}: {
	dataType: TypeOutput;
	props: {
		lineNumber: number;
		valueIndex: number;
		headersAmount: number;
		value: string;
		onChange: (rowIndex: number, cellIndex: number, value: string) => void;
	};
}): React.ReactElement {
	if (dataType === "date") {
		return (
			<div
				className={twMerge(
					"text-md -m-[0.5px] flex p-2 shadow-[inset_0px_0px_0px_1px_#1a202c] transition-all hover:bg-primary/5"
				)}
				style={{
					width: `calc(100% / ${props.headersAmount})`
				}}
			>
				<DatePicker
					date={props.value}
					onChange={(date) =>
						props.onChange(
							props.lineNumber,
							props.valueIndex,
							dayjs(date).format("DD/MM/YYYY").toString() ?? ""
						)
					}
				/>
			</div>
		);
	}
	return (
		<input
			key={`${props.lineNumber}-${props.valueIndex}`}
			style={{
				width: `calc(100% / ${props.headersAmount})`
			}}
			className={twMerge(
				props.valueIndex > 0 && "text-end",
				"text-md -m-[0.5px] flex p-2 shadow-[inset_0px_0px_0px_1px_#1a202c] transition-all hover:bg-primary/5"
			)}
			defaultValue={props.value}
			onChange={(event) =>
				props.onChange(
					props.lineNumber,
					props.valueIndex,
					event.target.value
				)
			}
		/>
	);
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

export { detectDataType, splitIntoChunks, componentForDataType };
