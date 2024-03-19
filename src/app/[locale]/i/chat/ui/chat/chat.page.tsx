import Icon from '@/shared/ui/Icon/Icon'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { Input } from '@nextui-org/react'
import { PiPaperclipBold } from 'react-icons/pi'

const Chat = () => {
	return (
		<DashboardLayout>
			<div>
				<div>
					<Input
						placeholder='Write you'
						startContent={<Icon SVG={PiPaperclipBold} fontSize={16} />}
					/>
				</div>
			</div>
		</DashboardLayout>
	)
}

export default Chat
