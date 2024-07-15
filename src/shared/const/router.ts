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

//Course
export const getCoursesRoute = () => `/d/c`
export const getCourseByIdRoute = (id: string) => `/d/c/${id}`
export const getSettingsRoute = () => `/d/settings`

//lessons

export const getLessonRoute = (lessonId: string) => `/d/c/l/${lessonId}`
