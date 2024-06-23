interface Language {
	short: string
	full: string
	code: string
}

export const languages: Language[] = [
	{ short: 'en', full: 'English', code: 'us' },
	{ short: 'ru', full: 'Russian', code: 'ru' },

	// { short: 'zh', full: 'Chinese', code: 'cn' },
	// { short: 'es', full: 'Spanish', code: 'es' },
	// { short: 'hi', full: 'Hindi', code: 'in' },
	// { short: 'ar', full: 'Arabic', code: 'sa' },
	// { short: 'pt', full: 'Portuguese', code: 'pt' },
	// { short: 'bn', full: 'Bengali', code: 'bd' },
	// { short: 'ja', full: 'Japanese', code: 'jp' },
	// { short: 'de', full: 'German', code: 'de' },
	// { short: 'fr', full: 'French', code: 'fr' },
	// { short: 'it', full: 'Italian', code: 'it' },
]
