import React, { useState } from "react";
import styles from "./NavAddMenu.module.css";

import ImgButton from "../../buttons/ImgButton";
import AddItemForm from "./AddItemForm";
import AddCategoryForm from "./AddCategoryForm";
import PopupRadioForm from "./PopupRadioForm";

const NavAddMenu = () => {
	const [isPopupVisible, setPopupVisibility] = useState(false);
	const [selectedForm, setSelectedForm] = useState("addItem");

	const handleButtonChange = () => {
		setPopupVisibility(!isPopupVisible);
	};

	const closePopup = () => {
		setPopupVisibility(false);
	};

	const renderForm = (selectedOption) => {
		if (selectedOption === "addItem") {
			return <AddItemForm handleClose={closePopup} />;
		} else if (selectedOption === "addCategory") {
			return <AddCategoryForm handleClose={closePopup} />;
		}
	};

	return (
		<div>
			<ImgButton
				buttonId="add-popup-btn"
				imgFileName="/plus_icon.png"
				onChange={handleButtonChange}
				className={
					isPopupVisible ? styles.rotateOpen : styles.rotateClose
				}
			/>

			{isPopupVisible && (
				<>
					<div className={styles.overlay}></div>
					<div className={styles.overlayLeft}></div>
					<div className={styles.overlayRight}></div>
					<div className={styles.popupContent}>
						<PopupRadioForm
							renderComponent={renderForm}
							selectedOption={selectedForm}
							setSelectedOption={setSelectedForm}
						/>
						{renderForm(selectedForm)}
					</div>
				</>
			)}
		</div>
	);
};

export default NavAddMenu;
