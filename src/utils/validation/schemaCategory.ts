import * as yup from "yup";
import { Category } from "../../data/@types/category";

export const schemaCategory = yup
	.object()
	.shape({
		name: yup
			.string()
			.required(
				"Obrigatório",
			),
		iamge: yup.mixed(),
	})
	.required();

export const initial: Category = {
	name: "",
	image: "/static/images/avatars/avatar_11.png",
};