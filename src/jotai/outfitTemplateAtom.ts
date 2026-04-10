import { atom } from "jotai";

export interface TemplateBox {
	boxId: number;
	itemId: string | null;
	imagePath: string | null;
	scale: number;
	isLocked: boolean;
	categories: string[];
}

const createEmptyBox = (): TemplateBox => ({
	boxId: Date.now(),
	itemId: null,
	imagePath: null,
	scale: 1,
	isLocked: false,
	categories: [],
});

export const templateRowsAtom = atom<TemplateBox[][]>([[createEmptyBox()]]);

export const setWholeTemplateAtom = atom(null, (get, set, { newTemplate }: { newTemplate: TemplateBox[][] }) => {
	if (newTemplate.length > 0) {
		set(templateRowsAtom, newTemplate);
	} else {
		set(templateRowsAtom, [[createEmptyBox()]]);
	}
});

export const setWholeRowAtom = atom(null, (get, set, { rowIndex, newRow }: { rowIndex: number; newRow: TemplateBox[] }) => {
	if (rowIndex === -1) return;
	const rows = get(templateRowsAtom).map((row) => [...row]);
	rows[rowIndex] = newRow;
	set(templateRowsAtom, rows);
});

export const setBoxItemAtom = atom(null, (get, set, { rowIndex, boxIndex, itemId, imagePath }: { rowIndex: number; boxIndex: number; itemId: string | null; imagePath: string | null }) => {
	if (boxIndex === -1 || rowIndex === -1) return;
	const rows = get(templateRowsAtom).map((row) => row.map((box) => ({ ...box })));
	rows[rowIndex][boxIndex].itemId = itemId;
	rows[rowIndex][boxIndex].imagePath = imagePath;
	set(templateRowsAtom, rows);
});

export const setBoxScaleAtom = atom(null, (get, set, { rowIndex, boxIndex, scale }: { rowIndex: number; boxIndex: number; scale: number }) => {
	if (boxIndex === -1 || rowIndex === -1) return;
	const rows = get(templateRowsAtom).map((row) => row.map((box) => ({ ...box })));
	rows[rowIndex][boxIndex].scale = scale;
	set(templateRowsAtom, rows);
});

export const setBoxLockedStatusAtom = atom(null, (get, set, { rowIndex, boxIndex, isLocked }: { rowIndex: number; boxIndex: number; isLocked: boolean }) => {
	if (boxIndex === -1 || rowIndex === -1) return;
	const rows = get(templateRowsAtom).map((row) => row.map((box) => ({ ...box })));
	rows[rowIndex][boxIndex].isLocked = isLocked;
	set(templateRowsAtom, rows);
});

export const setBoxCategoriesAtom = atom(null, (get, set, { rowIndex, boxIndex, categories }: { rowIndex: number; boxIndex: number; categories: string[] }) => {
	if (boxIndex === -1 || rowIndex === -1) return;
	const rows = get(templateRowsAtom).map((row) => row.map((box) => ({ ...box })));
	rows[rowIndex][boxIndex].categories = categories;
	set(templateRowsAtom, rows);
});

export const addTemplateBoxBeforeAtom = atom(null, (get, set, { rowIndex, boxIndex }: { rowIndex: number; boxIndex: number }) => {
	if (boxIndex === -1 || rowIndex === -1) return;
	const rows = get(templateRowsAtom).map((row) => [...row]);
	rows[rowIndex].splice(boxIndex, 0, createEmptyBox());
	set(templateRowsAtom, rows);
});

export const addTemplateRowBeforeAtom = atom(null, (get, set, { rowIndex }: { rowIndex: number }) => {
	if (rowIndex === -1) return;
	const rows = get(templateRowsAtom).map((row) => [...row]);
	rows.splice(rowIndex, 0, [createEmptyBox()]);
	set(templateRowsAtom, rows);
});

export const addTemplateBoxAfterAtom = atom(null, (get, set, { rowIndex, boxIndex }: { rowIndex: number; boxIndex: number }) => {
	if (boxIndex === -1 || rowIndex === -1) return;
	const rows = get(templateRowsAtom).map((row) => [...row]);
	rows[rowIndex].splice(boxIndex + 1, 0, createEmptyBox());
	set(templateRowsAtom, rows);
});

export const addTemplateRowAfterAtom = atom(null, (get, set, { rowIndex }: { rowIndex: number }) => {
	if (rowIndex === -1) return;
	const rows = get(templateRowsAtom).map((row) => [...row]);
	rows.splice(rowIndex + 1, 0, [createEmptyBox()]);
	set(templateRowsAtom, rows);
});

export const removeTemplateBoxAtom = atom(null, (get, set, { rowIndex, boxIndex }: { rowIndex: number; boxIndex: number }) => {
	const rows = get(templateRowsAtom).map((row) => [...row]);

	if (rows.length === 1 && rowIndex !== -1 && rows[rowIndex].length === 1) {
		set(templateRowsAtom, [[createEmptyBox()]]);
	} else if (boxIndex !== -1 && rowIndex !== -1) {
		if (rows[rowIndex].length === 1) {
			rows.splice(rowIndex, 1);
		} else {
			rows[rowIndex].splice(boxIndex, 1);
		}
		set(templateRowsAtom, rows);
	}
});
