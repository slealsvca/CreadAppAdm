export type PublicationType = {
	title: string;
	category: string;
	isBanners: boolean;
	createdAt?: string;
	summary: string;
	content: string;
	status?: string;
	video_url: string;
	image_url: string;
	file: string;
};

export type PublicationTypeTB = {
	title: string;
	category: {
		name: string
	}
	;
	isBanners: boolean;
	createdAt?: string;
	summary: string;
	status?: string;
	video_url: string;
	image_url: string;
};

export type CategoryType = {
	value: string;
	label?: string;
};
