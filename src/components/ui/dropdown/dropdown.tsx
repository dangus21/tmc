import { useSeguradoraState } from "@/store";

type DropdownProps = {
	name: string;
	id: string;
};

function Dropdown(props: DropdownProps) {
	const { name, id } = props;
	const { tables } = useSeguradoraState();
	return (
		<select
			className="min-w-44 rounded-sm border bg-white p-1 text-black shadow-sm focus:outline-none"
			name={name}
			id={id}
			onChange={(event) => {
				tables.setCurrentTable(event.target.value);
				tables.getTable(event.target.value);
			}}
		>
			<option selected hidden>
				Select a value
			</option>
			<option>None</option>
			{tables.availableTables.map((table, index) => (
				<option key={`${table}-${index}`} value={table}>
					{table}
				</option>
			))}
		</select>
	);
}

export { Dropdown };
