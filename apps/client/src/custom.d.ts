declare module '*.svg' {
	import * as React from 'react'

	const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
	export default ReactComponent
}

declare module '*.css' {
	const content: any
	export default content
}

declare module '*.less' {
	const content: { [key: string]: string }
	export default content
}
