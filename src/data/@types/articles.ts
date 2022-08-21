export interface articleType {
	created_at: string;
	deleted_at: string;
	doc: string;
	id: string;
	latex: string;
	pdf: string;
	resume: string;
	status: string;
	title: string;
	updated_at: string;
	category?: string;
}

export interface tableRowProps {
	article: articleType[] | null;
	handleEdit: (
		article: articleType,
	) => void;
	handleView: (id: string) => void;
}

export interface userArticleType {
	id: string;
	article_id: string;
	user_id: string;
	user_type: string;
}
