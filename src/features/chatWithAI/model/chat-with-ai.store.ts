import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ChatStore {
	selectedChatId: string | null
	setSelectedChatId: (id: string) => void
}

export const useChatStore = create(
	persist<ChatStore>(
		set => ({
			selectedChatId: null,
			setSelectedChatId: id => set({ selectedChatId: id })
		}),
		{
			name: 'chat-store', // unique name
			getStorage: () => localStorage
		}
	)
)
