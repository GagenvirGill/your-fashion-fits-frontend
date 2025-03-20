import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../store/reducers/categoriesReducer";
import { getAllCategories } from "../../api/Category";
import CheckboxButton from "./CheckboxButton";
import Button from "./Button";
import styles from "./CategoriesCheckboxForm.module.css";

const CategoriesCheckboxForm = ({ handleSubmit }) => {
	const dispatch = useDispatch();
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const { categories, refresh } = useSelector((state) => state.categories);

	useEffect(() => {
		getAllCategories()
			.then((fetchedCategories) => {
				dispatch(setCategories(fetchedCategories));
			})
			.catch((err) => {
				console.log(`Error loading categories: ${err}`);
			});
	}, [dispatch, refresh]);

	const handleCheckboxChange = (categoryId, checked) => {
		setSelectedCategories((prevState) => {
			if (checked) {
				return [...prevState, categoryId];
			} else {
				return prevState.filter((idVal) => idVal !== categoryId);
			}
		});
	};

	const handleCheckboxSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		handleSubmit(selectedCategories);
		setLoading(false);
	};

	return (
		<form
			className={styles.filterItemsForm}
			onSubmit={handleCheckboxSubmit}
		>
			{categories.map((category) => (
				<CheckboxButton
					key={category.categoryId}
					text={category.name}
					id={category.categoryId}
					onChange={(event) =>
						handleCheckboxChange(
							category.categoryId,
							event.target.checked
						)
					}
				/>
			))}
			<br />
			<Button type={"submit"} text={"Submit"} disabled={loading} />
		</form>
	);
};

export default CategoriesCheckboxForm;
