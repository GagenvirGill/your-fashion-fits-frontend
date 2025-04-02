import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { refreshState } from "../../../store/reducers/outfitsReducer";
import { createOutfit } from "../../../api/Outfit";

import styles from "./AddOutfitForm.module.css";
import Button from "../../buttons/Button";

const AddOutfitForm = ({ handleClose }) => {
	const dispatch = useDispatch();
	const [dateWorn, setDateWorn] = useState(new Date());
	const [description, setDescription] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		await createOutfit(dateWorn, description, []);
		dispatch(refreshState());
		handleClose();
	};

	return (
		<div>
			<p className={styles.formTitle}>Create a new Outfit</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="dateWorn" className={styles.formText}>
					Date Worn:{" "}
				</label>
				<input
					type="date"
					id="date"
					value={dateWorn}
					onChange={(e) => setDateWorn(e.target.value)}
					required
				/>
				<br />
				<label htmlFor="description" className={styles.formText}>
					Outfit Description:{" "}
				</label>
				<input
					type="text"
					id="description"
					className={styles.textInput}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<br />
				<br />
				<Button type="submit" text={"Create"} />
			</form>
		</div>
	);
};

export default AddOutfitForm;
