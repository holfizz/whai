// import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'
// import remarkMath from 'remark-math'
// import rehypeKatex from 'rehype-katex'
// import '@/app/(styles)/a11.scss'
// import QuoteWrapper from './QuoteWrapper'
// import ParenthesesWrapper from './ParentsWrapper'
// import { ListWrapperOl, ListWrapperUl } from './ListWrapper'
//
// const components = {
// 	h1: props => (
// 		<p className='text-lg pb-2 my-2'>
// 			<QuoteWrapper>
// 				<ParenthesesWrapper {...props} />
// 			</QuoteWrapper>
// 		</p>
// 	),
// 	h2: props => (
// 		<p className='text-medium pb-2 my-2'>
// 			<QuoteWrapper>
// 				<ParenthesesWrapper {...props} />
// 			</QuoteWrapper>
// 		</p>
// 	),
// 	h3: props => (
// 		<p className='text-medium pb-2 my-2'>
// 			<QuoteWrapper>
// 				<ParenthesesWrapper {...props} />
// 			</QuoteWrapper>
// 		</p>
// 	),
// 	h4: props => (
// 		<p className='text-medium pb-2 my-2'>
// 			<QuoteWrapper>
// 				<ParenthesesWrapper {...props} />
// 			</QuoteWrapper>
// 		</p>
// 	),
// 	h5: props => <h5 className='text-base font-normal pb-2 my-2' {...props} />,
// 	h6: props => <h6 className='text-xs font-light pb-2 my-2' {...props} />,
// 	p: props => (
// 		<p className='text-medium pb-2 my-2'>
// 			<QuoteWrapper>
// 				<ParenthesesWrapper {...props} />
// 			</QuoteWrapper>
// 		</p>
// 	),
//
// 	li: props => (
// 		<li>
// 			<QuoteWrapper>
// 				<ParenthesesWrapper {...props} />
// 			</QuoteWrapper>
// 		</li>
// 	),
// 	strong: props => <strong className='font-bold' {...props} />,
// 	em: props => <em className='italic' {...props} />,
// 	ul: props => <ListWrapperUl {...props} />,
// 	ol: props => <ListWrapperOl {...props} />
// }
// const options = {
// 	mdxOptions: {
// 		remarkPlugins: [remarkMath],
// 		rehypePlugins: [rehypeKatex]
// 	}
// }
//
// function MDXMessage(props: MDXRemoteProps) {
// 	return <MDXRemote {...props} />
// }
//
// export default MDXMessage
