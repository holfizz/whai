import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import Loadable from 'react-loadable'

const AsyncMDX = Loadable({
	loader: () => import('@/shared/ui/MDX/SimpleMDX'),
	loading: () => (
		<div>
			<DotsLoader />
		</div>
	)
})

export default AsyncMDX
