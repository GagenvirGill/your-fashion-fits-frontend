import React, { useState } from "react";
import styles from "../ContextMenuPopUpStyles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { refreshState } from "../../../store/reducers/outfitsReducer";

import { createOutfit } from "../../../api/Outfit";

import Button from "../../buttons/Button";

const CreateOutfitForm = ({ setShowCreateOutfitForm }) => {
	const dispatch = useDispatch();
	const { templateBoxes } = useSelector((state) => state.outfitTemplate);

	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");

	const handleCreateOutfit = async (e) => {
		e.preventDefault();
		e.stopPropagation();

		let errorFlag = false;
		const outfitsItems = templateBoxes.map((box, index) => {
			if (!box.itemId) {
				errorFlag = true;
				return;
			}

			return {
				itemId: box.itemId,
				orderNum: index,
				itemWeight: box.scale * 10,
			};
		});

		if (errorFlag) {
			alert("Please select items for the empty boxes or remove them.");
			return;
		}
		if (outfitsItems.length === 0) {
			alert("Please select at least one item to create an outfit.");
			return;
		}
		if (outfitsItems.length > 10) {
			alert("You can only select up to 10 items.");
			return;
		}

		if (date === "") {
			alert("Please select a date.");
			return;
		}

		setShowCreateOutfitForm(false);
		await createOutfit(date, description, outfitsItems);
		dispatch(refreshState());
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
				<br />
				<br />
			</div>
		</>
	);
};

export default CreateOutfitForm;
