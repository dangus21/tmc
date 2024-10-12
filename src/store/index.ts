import { Table } from "@/pages/api/tables/[table]";
import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { produce } from "immer";

export type SeguradoraState = {
	tables: {
		value: string;
		table: Table;
		tableEdit: Table;
		availableTables: string[];
		setCurrentTable: (tableId: string) => void;
		getTables: () => void;
		getTable: (tableId: string) => void;
		insertRow: () => void;
		editRow: (rowIndex: number, cellIndex: number, value: string) => void;
		discardChanges: () => void;
		confirmChanges: () => void;
	};
};

const useSeguradoraState = create<SeguradoraState>((set, get) => ({
	tables: {
		value: "Select a table",
		table: {
			headers: [],
			values: [],
			dataTypes: []
		},
		tableEdit: {
			headers: [],
			values: [],
			dataTypes: []
		},
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
				set((state) => ({
					tables: {
						...state.tables,
						table: {
							headers: [],
							values: [],
							dataTypes: []
						}
					}
				}));
				return;
			}

			const res = await fetch(`/api/tables/${tableId}.xlsx`);
			const tablesList = (await res.json()) as { data: Table };

			set((state) => ({
				tables: {
					...state.tables,
					table: tablesList.data,
					tableEdit: tablesList.data
				}
			}));
		},
		insertRow() {
			set(
				produce((state: SeguradoraState) => {
					state.tables.tableEdit.values = [
						...state.tables.tableEdit.values,
						[
							state.tables.tableEdit.values.length,
							get().tables.table.headers.map(() => ["", null])
						]
					];
				})
			);
		},
		editRow(rowIndex, cellIndex, value) {
			set(
				produce((state: SeguradoraState) => {
					state.tables.tableEdit.values[rowIndex][1][cellIndex][0] =
						value;
				})
			);
		},
		discardChanges() {
			set(
				produce((state: SeguradoraState) => {
					state.tables.tableEdit = {
						...get().tables.table,
						values: get().tables.table.values
					};
				})
			);
		},
		confirmChanges() {
			set(
				produce((state: SeguradoraState) => {
					state.tables.table = state.tables.tableEdit;
				})
			);
		}
	}
}));

if (process.env.NODE_ENV === "development") {
	mountStoreDevtool("state", useSeguradoraState);
}

export { useSeguradoraState };
