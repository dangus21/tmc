type DropdownProps = {
	name: string;
	id: string;
	value: string;
	onChange: (newValue: string) => void;
};

function DropdownBoolean(props: DropdownProps) {
	const { name, id, value, onChange } = props;
	return (
		<select
			className="min-w-44 rounded-sm border bg-white p-1 text-black shadow-sm focus:outline-none"
			name={name}
			id={id}
			onChange={(event) => onChange(event.target.value)}
			value={value}
		>
			{["Yes", "No"].map((opt, index) => (
				<option key={`${opt}-${index}`} value={opt}>
					{opt}
				</option>
			))}
		</select>
	);
}

export { DropdownBoolean };
