export type SearchPost = {
	id: string
	name: string
	description: string
	'created-at': string
	tags: string[]
	preview_id: string
	liked: boolean
}

export interface Post extends SearchPost {
	page_list: string[]
	created_at: string
	preview_src: string
	isLoading: boolean
}

export type UploadPostPhoto = {
	fileName: string
	fileUrl: string
}

export type PostSlice = Post & {
	uploadPost: {
		photos: UploadPostPhoto[]
	}
}

export type SearchListProps = {
	liked: boolean
}
