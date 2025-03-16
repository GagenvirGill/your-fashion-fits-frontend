import React from "react";
import RadioButton from "../../buttons/RadioButton";

const PopupRadioForm = ({
	renderComponent,
	selectedOption,
	setSelectedOption,
}) => {
	const handleRadioChange = (event) => {
		setSelectedOption(event.target.value);
		renderComponent(event.target.value);
	};

	return (
		<form>
			<RadioButton
				text="Add new Items"
				buttonId="AddItem"
				value="addItem"
				checked={selectedOption === "addItem"}
				onChange={handleRadioChange}
			/>
			<RadioButton
				text="Add new Categories"
				buttonId="AddCategory"
				value="addCategory"
				checked={selectedOption === "addCategory"}
				onChange={handleRadioChange}
			/>
		</form>
	);
};

export default PopupRadioForm;
