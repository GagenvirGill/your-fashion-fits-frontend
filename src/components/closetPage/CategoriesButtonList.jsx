import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../store/reducers/categoriesReducer";
import { getAllCategories } from "../../api/Category";
import CheckboxButton from "../buttons/CheckboxButton";

const CategoriesButtonList = ({ onCheckboxChange }) => {
	const dispatch = useDispatch();
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
		onCheckboxChange(categoryId, checked);
	};

	return (
		<>
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
		</>
	);
};

export default CategoriesButtonList;
