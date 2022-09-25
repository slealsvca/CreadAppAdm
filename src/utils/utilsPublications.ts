import React from "react";
import { PublicationType } from "../data/@types/publication";



export const categorys = [
	{ name: "0", id: "Educação" },
	{ name: "1", id: "Inovação" },
	{ name: "2", id: "Tecnologia" },
	{
		name: "3",
		id: "Mudanças Climáticas",
	},
	{ name: "4", id: "Ciência" },
	{ name: "5", id: "Saúde" },
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
