import React from "react";
import { PublicationType } from "../data/@types/publication";

export const initial: PublicationType =
	{
		title: "",
		resume: "",
		category_id: "",
		file: null,
	};

export const categorys = [
	{ value: "0", label: "Educação" },
	{ value: "1", label: "Inovação" },
	{ value: "2", label: "Tecnologia" },
	{
		value: "3",
		label: "Mudanças Climáticas",
	},
	{ value: "4", label: "Ciência" },
	{ value: "5", label: "Saúde" },
];

export const switchColorStatus = (
	status: string,
) => {
	switch (status) {
		case "created":
			return "primary";
		case "processed":
			return "secondary";
		case "pending":
			return "warning";
		case "analyzing":
			return "analyzing";
		case "corrections":
			return "corrections";
		case "rejected":
			return "error";
		case "approved":
			return "success";
		default:
			return "success";
	}
};
