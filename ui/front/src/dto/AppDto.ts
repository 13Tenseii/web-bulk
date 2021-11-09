export default interface AppDto {
    appContext: string,
    lang: 'en' | 'ru',
    user?: {
        login: string
    }
}