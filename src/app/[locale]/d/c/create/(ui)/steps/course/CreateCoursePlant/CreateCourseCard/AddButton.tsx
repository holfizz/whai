import Button from '@/shared/ui/Button/Button'
import { PlusIcon } from 'lucide-react'

const AddButton = () => {
	return (
		<div className='h-auto min-h-[290px] w-full flex items-center justify-center'>
			<Button size={'bigIcon'} variant='sRound' color='secondary'>
				<PlusIcon />
			</Button>
		</div>
	)
}
export default AddButton
