// components/mdx-remote.js
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import '@/app/(styles)/a11.scss'
import QuoteWrapper from './QuoteWrapper'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import rehypeRaw from 'rehype-raw'
import ParenthesesWrapper from './ParentsWrapper'
import { ListWrapperOl, ListWrapperUl } from './ListWrapper'

const components = {
	h1: props => <h1 className='text-3xl font-black pb-2 my-2' {...props} />,
	h2: props => <h2 className='text-2xl font-bold pb-2 my-2' {...props} />,
	h3: props => <h3 className='text-xl font-semibold pb-2 my-2' {...props} />,
	h4: props => <h4 className='text-lg font-medium pb-2 my-2' {...props} />,
	h5: props => <h5 className='text-base font-normal pb-2 my-2' {...props} />,
	h6: props => <h6 className='text-xs font-light pb-2 my-2' {...props} />,
	p: props => (
		<p className='text-medium pb-2 my-2'>
			<QuoteWrapper>
				<ParenthesesWrapper {...props} />
			</QuoteWrapper>
		</p>
	),
	pre: props => (
		<pre className='border-2 border-decor-4 rounded-2xl p-5' {...props}></pre>
	),
	li: props => (
		<li>
			<QuoteWrapper>
				<ParenthesesWrapper {...props} />
			</QuoteWrapper>
		</li>
	),
	strong: props => <strong className='font-bold' {...props} />,
	em: props => <em className='italic' {...props} />,
	ul: props => <ListWrapperUl {...props} />,
	ol: props => <ListWrapperOl {...props} />
}
const options = {
	mdxOptions: {
		remarkPlugins: [remarkMath, remarkGfm, remarkFrontmatter, remarkParse],
		rehypePlugins: [rehypeKatex, rehypeHighlight, rehypeRaw]
	}
}
export function MDX(props: MDXRemoteProps) {
	return (
		<MDXRemote
			{...props}
			options={options}
			components={{ ...components, ...(props.components || {}) }}
		/>
	)
}
