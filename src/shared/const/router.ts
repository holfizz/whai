export const getRouteMain = () => '/'
export const getRouteAbout = () => '/about'
export const getFAQRoute = () => '/faq'
export const getRouteContacts = () => '/contacts'
export const getRoutePay = () => '/pay'
export const getReviewRoute = () => '/review'
export const getRouteProfile = () => `/profile`
export const getRouteOffer = () => `/offer`
export const getRoutePrivacy = () => `/privacy`
export const getRouteCookiePolicy = () => `/cookie-policy`
export const getRouteSubscriptionTerm = () => `/subscription-term`
export const getRouteLogin = () => `/auth/login`
export const getRouteSignUp = () => `/auth/sign-up`
export const getRouteForgotPassword = () => `/forgot-password`
export const getSupportRoute = () => `/support`
export const getSubscriptionsRoute = () => `/subscriptions`

//dashboard - d
export const getDashboardRoute = () => `/d`
export const getChatWithAIRoute = () => `/chat-ai`
export const getStatisticsRoute = () => `/statistics`

//courses - c
export const getCoursesRoute = () => `/d/c`
export const getCourseByIdRoute = (
	id: string,
	topicId?: string,
	subtopicId?: string,
	lessonId?: string
) =>
	`/d/c/${id}?topicId=${topicId}&subtopicId=${subtopicId}&lessonId=${lessonId}`

export const getCourseExampleByIdRoute = (id: string) => `/d/c/e/${id}`
export const getSettingsRoute = () => `/d/settings`
export const getCreatePageRoute = () => `/d/c/create`

//lessons - l
export const getLessonRoute = (lessonId: string, topicId?: string) =>
	`/d/c/l/${lessonId}?topicId=${topicId}`
export const getLessonTaskRoute = (lessonId: string) => `/d/c/l/t/${lessonId}`
export const getLessonIndependentRoute = (lessonId: string) =>
	`/d/c/l/i/${lessonId}`

//quizzes - q
export const getQuizRoute = (quizId: string) => `/d/c/q/${quizId}`
export const getQuizIndependentRoute = (quizId: string) => `/d/c/q/i/${quizId}`

//library - lib
export const getLibraryRoute = (
	viewType?: 'tests' | 'lessons' | 'homework'
) => {
	return `/d/l?view=${viewType}`
}
