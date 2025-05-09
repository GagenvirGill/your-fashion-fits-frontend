import React, { useState } from "react";
import styles from "../ContextMenuPopUpStyles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { refreshState } from "../../../store/reducers/outfitsReducer";
import { setWholeTemplate } from "../../../store/reducers/outfitTemplateReducer";
import { addNotification } from "../../../store/reducers/notificationsReducer";

import { createOutfit } from "../../../api/Outfit";

import Button from "../../buttons/Button";

const CreateOutfitForm = ({ setShowCreateOutfitForm }) => {
	const dispatch = useDispatch();
	const { templateRows } = useSelector((state) => state.outfitTemplate);

	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");

	const handleCloseForm = (e) => {
		e.preventDefault();
		e.stopPropagation();

		setShowCreateOutfitForm(false);
	};

	const handleCreateOutfit = async (e) => {
		e.preventDefault();
		e.stopPropagation();

		const outfitsItems = [];

		for (const row of templateRows) {
			const rowItems = [];

			for (const box of row) {
				if (!box.itemId) {
					dispatch(
						addNotification(
							"Please select items for all boxes or remove them."
						)
					);
					return;
				}
				rowItems.push({
					itemId: box.itemId,
					itemWeight: box.scale * 10,
				});
			}

			if (rowItems.length > 5) {
				dispatch(
					addNotification(
						"You can only select up to 5 items per row."
					)
				);
				return;
			}

			outfitsItems.push(rowItems);
		}

		if (outfitsItems.length === 0) {
			dispatch(
				addNotification(
					"Please select at least one item to create an outfit."
				)
			);
			return;
		}
		if (outfitsItems.length > 8) {
			dispatch(
				addNotification("You can only have up to 8 rows of items.")
			);
			return;
		}
		if (outfitsItems.length !== templateRows.length) {
			dispatch(
				addNotification(
					"Please select items for the empty boxes or remove them."
				)
			);
			return;
		}
		if (date === "") {
			dispatch(addNotification("Please select a date."));
			return;
		}

		setShowCreateOutfitForm(false);
		const success = await createOutfit(date, description, outfitsItems);
		dispatch(refreshState());
		dispatch(setWholeTemplate({ newTemplate: [] }));

		if (success) {
			dispatch(
				addNotification(`Successfully Created an Outfit for ${date}!`)
			);
		} else {
			dispatch(
				addNotification(
					`An Error Occurred while Creating an Outfit for ${date}!`
				)
			);
		}
	};

	return (
		<>
			<div className={styles.overlay}></div>
			<div className={styles.popupForm}>
				<p className={styles.formTitle}>
					Select a Date and Description for the Outfit
				</p>
				<input
					type="date"
					placeholder={Date.now()}
					value={date}
					onChange={(e) => setDate(e.target.value)}
					className={styles.inputFieldDate}
				/>
				<br />
				<input
					type="text"
					placeholder="Outfit Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className={styles.inputFieldText}
				/>
				<br />
				<Button
					type="submit"
					text="Create Outfit"
					onClick={handleCreateOutfit}
				/>
				<Button type="submit" text="Cancel" onClick={handleCloseForm} />
				<br />
				<br />
			</div>
		</>
	);
};

export default CreateOutfitForm;
