declare module '*.css' {
	const content: any
	export default content
}

declare module '*.less' {
	const content: { [key: string]: string }
	export default content
}
