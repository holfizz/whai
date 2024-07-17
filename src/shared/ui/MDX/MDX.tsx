// components/mdx-remote.js
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'

const components = {
	h1: props => <h1 className='text-3xl font-black pb-2 my-2' {...props} />,
	h2: props => <h2 className='text-2xl font-bold pb-2 my-2' {...props} />,
	h3: props => <h3 className='text-xl font-semibold pb-2 my-2' {...props} />,
	h4: props => <h4 className='text-lg font-medium pb-2 my-2' {...props} />,
	h5: props => <h5 className='text-base font-normal pb-2 my-2' {...props} />,
	h6: props => <h6 className='text-xs font-light pb-2 my-2' {...props} />,
	p: props => <p className='text-medium pb-2 my-2' {...props} />
}

export function MDX(props: MDXRemoteProps) {
	return (
		<MDXRemote
			{...props}
			components={{ ...components, ...(props.components || {}) }}
		/>
	)
}
