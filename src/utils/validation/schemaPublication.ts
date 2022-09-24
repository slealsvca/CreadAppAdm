import * as yup from "yup";

export const SchemaPublication = yup
	.object()
	.shape({
		title: yup
			.string()
			.required(
				"Titulo obrigatório",
			),
		url: yup
			.string()
			.required(
				"Url obrigatório",
			),
		resume: yup
			.string()
			.required(
				"Resumo obrigatório",
			),
		category_id: yup
			.string()
			.required(
				"Categoria obrigatória",
			),
		user_id: yup.string(),
		file: yup.mixed(),
	})
	.required();
