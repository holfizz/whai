declare module '*.scss' {
	const content: Record<string, string>
	export default content
}
declare module '*.svg' {
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
	export default content
}
declare module '*.jpeg'
declare module '*.jpg'
declare module '*.png'
type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>
		}
	: T
type OptionalRecord<K extends keyof any, T> = {
	[P in K]?: T
}
