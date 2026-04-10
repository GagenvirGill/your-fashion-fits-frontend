import type { Item } from "./item";

export interface TemplateItem {
	templateItemId: string;
	itemWeight: number;
	orderNum: number;
	Item: Item;
}

export interface TemplateRow {
	orderNum: number;
	TemplateItems: TemplateItem[];
}

export interface OutfitTemplate {
	TemplateRows: TemplateRow[];
	totalWeight: number;
}

export interface Outfit {
	outfitId: string;
	dateWorn: string;
	description: string;
	OutfitTemplate: OutfitTemplate;
}
