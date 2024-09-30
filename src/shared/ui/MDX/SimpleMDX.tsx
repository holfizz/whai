import 'katex/dist/katex.min.css'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'

import { ListWrapperUl } from './ListWrapper'
const components = {
	math: ({ node, ...props }) => <h1 className='red' {...props}></h1>,
	h1: ({ node, ...props }) => (
		<h5 className='text-base font-normal pb-2 my-2' {...props} />
	),
	h2: ({ node, ...props }) => (
		<h5 className='text-base font-normal pb-2 my-2' {...props} />
	),
	h3: ({ node, ...props }) => (
		<h5 className='text-base font-normal pb-2 my-2' {...props} />
	),
	h4: ({ node, ...props }) => (
		<h5 className='text-base font-normal pb-2 my-2' {...props} />
	),
	h5: ({ node, ...props }) => (
		<h5 className='text-base font-normal pb-2 my-2' {...props} />
	),
	h6: ({ node, ...props }) => (
		<h5 className='text-base font-normal pb-2 my-2' {...props} />
	),
	p: ({ node, ...props }) => (
		<p
			className='text-center text-medium pb-2 my-2 max-md:text-xl text-wrap'
			{...props}
		></p>
	),
	pre: ({ node, ...props }) => (
		<pre className='border-2 border-decor-4 rounded-2xl p-5' {...props}></pre>
	),
	li: ({ node, ...props }) => <li className='ml-1 font-medium' {...props} />,
	strong: ({ node, ...props }) => <strong className='font-bold' {...props} />,
	em: ({ node, ...props }) => <em className='italic' {...props} />,
	ul: ({ node, ...props }: any) => <ListWrapperUl size='sm' {...props} />,
	ol: ({ node, ...props }) => <ol className='*:list-decimal' {...props} />
}
const SimpleMDX = ({ children, className }: any) => {
	return (
		<ReactMarkdown
			// eslint-disable-next-line react/no-children-prop
			children={children}
			className={className}
			remarkPlugins={[remarkMath, remarkGfm, remarkFrontmatter, remarkParse]}
			rehypePlugins={[rehypeKatex, rehypeHighlight]}
			components={components}
		/>
	)
}

export default SimpleMDX
