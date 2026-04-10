import { atom } from "jotai";

export interface Notification {
	id: number;
	message: string;
}

let idCounter = 1;

export const notificationsAtom = atom<Notification[]>([]);

export const addNotificationAtom = atom(null, (get, set, message: string) => {
	const current = get(notificationsAtom);
	set(notificationsAtom, [...current, { id: idCounter++, message }]);
});

export const removeNotificationAtom = atom(null, (get, set, id: number) => {
	const current = get(notificationsAtom);
	set(notificationsAtom, current.filter((n) => n.id !== id));
});
