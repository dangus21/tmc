import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

export type SeguradoraState = {
	tables: {
		value: string;
		table: unknown | null;
		availableTables: string[];
		setCurrentTable: (tableId: string) => void;
		getTables: () => void;
		getTable: (tableId: string) => void;
	};
};

const useSeguradoraState = create<SeguradoraState>((set, get) => ({
	tables: {
		value: "Select a table",
		table: null,
		availableTables: [],
		setCurrentTable(tableId) {
			set((state) => ({
				tables: {
					...state.tables,
					value: tableId
				}
			}));
		},
		async getTables() {
			if (get().tables.availableTables.length > 0) {
				return;
			}
			const res = await fetch("/api/tables/list");
			const tablesList = await res.json();

			set((state) => ({
				tables: {
					...state.tables,
					availableTables: tablesList.files
				}
			}));
		},
		async getTable(tableId) {
			if (tableId === "None") {
				return;
			}

			const res = await fetch(`/api/tables/${tableId}.xlsx`);
			const tablesList = await res.json();

			set((state) => ({
				tables: {
					...state.tables,
					table: tablesList.files
				}
			}));
		}
	}
}));

if (process.env.NODE_ENV === "development") {
	mountStoreDevtool("state", useSeguradoraState);
}

export { useSeguradoraState };
