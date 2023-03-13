import * as yup from "yup";
import { PublicationType } from "../../data/@types/publication";

export const SchemaPublication = yup
	.object()
	.shape({
		title: yup
			.string().required("Titulo obrigatório",),
		summary: yup
			.string().required("Resumo obrigatório",),
		content: yup.string()
			.required("Conteúdo obrigatório",),
		category: yup
			.string().required("Categoria obrigatória"),
		video_url: yup.mixed(),
		image_url: yup.mixed(),
		file: yup.string().required("Arquivo obrigatório"),
	})
	.required();

export const initial: PublicationType = {
	title: "",
	category: "",
	summary: "",
	content: "",
	isBanners: false,
	video_url: "",
	image_url: "",
	file: "",
};