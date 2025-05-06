import React, { useState } from "react";
import styles from "../ContextMenuPopUpStyles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { refreshState } from "../../../store/reducers/outfitsReducer";
import { setWholeTemplate } from "../../../store/reducers/outfitTemplateReducer";

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

		let error = false;

		const outfitsItems = templateRows.map((row) => {
			const rowItems = row.map((box) => {
				if (!box.itemId) {
					error = true;
					return;
				} else {
					return {
						itemId: box.itemId,
						itemWeight: box.scale * 10,
					};
				}
			});

			if (rowItems.length > 5) {
				alert("You can only select up to 5 items per row.");
				error = true;
				return;
			}
			if (rowItems.length !== row.length) {
				alert(
					"Please select items for the empty boxes or remove them."
				);
				error = true;
				return;
			}

			return rowItems;
		});

		if (outfitsItems.length === 0) {
			alert("Please select at least one item to create an outfit.");
			return;
		}
		if (outfitsItems.length > 8) {
			alert("You can only have up to 8 rows of items.");
			return;
		}
		if (outfitsItems.length !== templateRows.length) {
			alert("Please select items for the empty boxes or remove them.");
			return;
		}
		if (date === "") {
			alert("Please select a date.");
			return;
		}

		setShowCreateOutfitForm(false);
		if (!error) {
			await createOutfit(date, description, outfitsItems);
			dispatch(refreshState());
			dispatch(setWholeTemplate({ newTemplate: [] }));
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
