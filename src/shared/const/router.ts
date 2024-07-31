export const getRouteMain = () => '/'
export const getRouteAbout = () => '/about'
export const getRouteProfile = () => `/profile`
export const getRouteLogin = () => `/auth/login`
export const getRouteSignUp = () => `/auth/sign-up`
export const getRouteForgotPassword = () => `/auth/forgot-password`
export const getSupportRoute = () => `/support`

//dashboard - d
export const getDashboardRoute = () => `/d`
export const getChatWithAIRoute = () => `/d/chat-ai`
export const getStatisticsRoute = () => `/statistics`

//courses - c
export const getCoursesRoute = () => `/d/c`
export const getCourseByIdRoute = (id: string) => `/d/c/${id}`
export const getSettingsRoute = () => `/d/settings`
export const getCreatePageRoute = () => `/d/c/create`

//lessons - l
export const getLessonRoute = (lessonId: string) => `/d/c/l/${lessonId}`

//quizzes - q
export const getQuizRoute = (quizId: string) => `/d/c/q/${quizId}`
export const getQuizIndependentRoute = (quizId: string) => `/d/c/q/i/${quizId}`
