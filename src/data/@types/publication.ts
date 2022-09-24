export type PublicationType = {
	title: string;
	url: string;
	resume: string;
	category_id: string;
	user_id?: string;
	file: any;
};

export type CategoryType = {
	value: string;
	label?: string;
};
