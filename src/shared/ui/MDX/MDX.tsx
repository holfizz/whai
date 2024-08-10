import '@/app/(styles)/a11.scss'
import 'katex/dist/katex.min.css'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import { ListWrapperOl, ListWrapperUl } from './ListWrapper'
import ParenthesesWrapper from './ParentsWrapper'
import QuoteWrapper from './QuoteWrapper'
const components = {
	h1: ({ node, ...props }) => (
		<h1 className='text-3xl font-black pb-2 my-2' {...props} />
	),
	h2: ({ node, ...props }) => (
		<h2 className='text-2xl font-bold pb-2 my-2' {...props} />
	),
	h3: ({ node, ...props }) => (
		<h3 className='text-xl font-semibold pb-2 my-2' {...props} />
	),
	h4: ({ node, ...props }) => (
		<h4 className='text-lg font-medium pb-2 my-2' {...props} />
	),
	h5: ({ node, ...props }) => (
		<h5 className='text-base font-normal pb-2 my-2' {...props} />
	),
	h6: ({ node, ...props }) => (
		<h6 className='text-xs font-light pb-2 my-2' {...props} />
	),
	p: ({ node, ...props }: any) => (
		<p className='text-medium pb-2 my-2'>
			<QuoteWrapper>
				<ParenthesesWrapper {...props} />
			</QuoteWrapper>
		</p>
	),
	pre: ({ node, ...props }) => (
		<pre className='border-2 border-decor-4 rounded-2xl p-5' {...props}></pre>
	),
	li: ({ node, ...props }: any) => (
		<li>
			<QuoteWrapper>
				<ParenthesesWrapper {...props} />
			</QuoteWrapper>
		</li>
	),
	strong: ({ node, ...props }) => <strong className='font-bold' {...props} />,
	em: ({ node, ...props }) => <em className='italic' {...props} />,
	ul: ({ node, ...props }: any) => <ListWrapperUl size='md' {...props} />,
	ol: ({ node, ...props }: any) => <ListWrapperOl {...props} />
}

const MDX = ({ children }: { children?: string }) => {
	return (
		<ReactMarkdown
			// eslint-disable-next-line react/no-children-prop
			children={children}
			remarkPlugins={[remarkMath, remarkGfm, remarkFrontmatter, remarkParse]}
			rehypePlugins={[rehypeKatex, rehypeHighlight]}
			components={components}
		/>
	)
}

export default MDX
