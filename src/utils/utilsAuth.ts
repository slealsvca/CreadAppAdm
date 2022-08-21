import React from "react";

export const avatars = [
	{
		name: "Kent Dodds",
		url: "Cat.jpg",
	},
	{
		name: "Prosper Otemuyiwa",
		url: "https://bit.ly/prosper-baba",
	},
	{
		name: "Christian Nwamba",
		url: "david_rotman.png",
	},
];

export type SignInData = {
	email: string;
	password: string;
};

export const initialValues = {
	email: "",
	password: "",
};
