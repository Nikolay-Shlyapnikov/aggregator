import { Post, SearchListProps } from '../../post/store/types'

export type SearchSlice = {
	posts: Post[]
	filters: SearchListProps
}
