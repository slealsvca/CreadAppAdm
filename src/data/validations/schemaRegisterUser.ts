import * as Yup from "yup";
import { userType } from "../@types/user";
import { VerifyCPF } from "../../utils/masks";
import { REQUIRED_VALIDATION } from "../../utils/REQUIRED_VALIDATION";

export const Schema = Yup.object()
	.shape({
		name: Yup.string().required(
			REQUIRED_VALIDATION("Nome"),
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
		username: Yup.string().required(
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
		password: Yup.string()
			.required(
				REQUIRED_VALIDATION(
					"Senha",
				),
			)
			.min(
				6,
				"A senha deve ter no mínimo 6 caracteres!",
			),
		confirmPassword: Yup.string()
			.required(
				REQUIRED_VALIDATION(
					"Confirmar senha",
				),
			)
			.oneOf(
				[Yup.ref("password")],
				"As senhas não conferem!",
			),
		user_level: Yup.string(),
	})
	.required()
	.nullable();

export const initialValues: userType = {
	name: "",
	email: "",
	cpf: "",
	username: "",
	password: "",
	confirmPassword: "",
	user_level: "writer",
	titration: "",
	institute: "",
};
