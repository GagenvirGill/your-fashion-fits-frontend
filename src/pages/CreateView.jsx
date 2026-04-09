import React, { useState, useEffect } from "react";
import styles from "./GenericPageStyles.module.css";

import FormSelectorRadioButtons from "../components/createPage/FormSelectorRadioButtons";
import AddOutfitForm from "../components/createPage/outfits/AddOutfitForm";
import AddItemForm from "../components/createPage/items/AddItemForm";
import AddCategoryForm from "../components/createPage/categories/AddCategoryForm";
import { preloadSession } from "../util/BackgroundRemoval";

const CreateView = () => {
	const [selectedForm, setSelectedForm] = useState("addItem");

	useEffect(() => {
		preloadSession();
	}, []);

	const renderForm = (selectedOption) => {
		if (selectedOption === "addOutfit") {
			return <AddOutfitForm />;
		} else if (selectedOption === "addItem") {
			return <AddItemForm />;
		} else if (selectedOption === "addCategory") {
			return <AddCategoryForm />;
		}
	};

	return (
		<div className={styles.pageContainer}>
			<FormSelectorRadioButtons
				renderComponent={renderForm}
				selectedOption={selectedForm}
				setSelectedOption={setSelectedForm}
			/>
			{renderForm(selectedForm)}
		</div>
	);
};

export default CreateView;
