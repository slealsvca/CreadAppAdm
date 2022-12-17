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
		})
		.required()
		.nullable();

export const initialAccount = {
	name: "",
	email: "",
	cpf: "",
};

export type typeAccount = {
	name: string;
	email: string;
	cpf: string;
};
