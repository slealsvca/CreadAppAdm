import * as Yup from "yup";
import { userType } from "../@types/user";
import { VerifyCPF } from "../../utils/masks";
import { REQUIRED_VALIDATION } from "../../utils/REQUIRED_VALIDATION";

export const SchemaAccount =
	Yup.object()
		.shape({
			name: Yup.string().required(
				REQUIRED_VALIDATION(
					"Nome",
				),
			),
			email: Yup.string()
				.email()
				.required(
					REQUIRED_VALIDATION(
						"Email",
					),
				),
			cpf: Yup.string()
				.required(
					REQUIRED_VALIDATION(
						"CPF",
					),
				)
				.min(11)
				.test(
					"cpf",
					"CPF inválido",
					value => {
						return VerifyCPF(
							`${value}`,
						);
					},
				),
			username:
				Yup.string().required(
					REQUIRED_VALIDATION(
						"Nome de usuário",
					),
				),
			titration:
				Yup.string().required(
					REQUIRED_VALIDATION(
						"Titulação",
					),
				),
			institute:
				Yup.string().required(
					REQUIRED_VALIDATION(
						"Instituição",
					),
				),
			user_level: Yup.string(),
		})
		.required()
		.nullable();

export const initialAccount = {
	name: "",
	email: "",
	cpf: "",
	username: "",
	user_level: "writer",
	titration: "",
	institute: "",
};

export type typeAccount = {
	name: string;
	email: string;
	cpf: string;
	username: string;
	user_level: string;
	titration: string;
	institute: string;
};
