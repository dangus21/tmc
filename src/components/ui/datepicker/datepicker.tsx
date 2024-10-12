import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function DatePicker({
	date,
	onChange
}: {
	date: string;
	onChange: (date: Date | undefined) => void;
}) {
	const [calendarDate, setCalendarDate] = React.useState<Date>();

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"flex w-[280px] justify-between font-normal",
						!date && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? date : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={calendarDate}
					onSelect={(date) => {
						setCalendarDate(date);
						onChange(date);
					}}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}

export { DatePicker };
