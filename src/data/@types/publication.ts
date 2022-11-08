export type PublicationType = {
	title: string;
	category: string;
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
