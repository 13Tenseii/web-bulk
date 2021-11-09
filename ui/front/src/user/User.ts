import Autowired from "@plastique/core/base/Autowired";
import RestApi from "../api/RestApi";
import Main from "../Main";

export default class User {
    @Autowired private readonly restApi: RestApi
    @Autowired private readonly main: Main
    public alreadyLogged: boolean

    constructor(
        public login?: string,
        public locale?: 'en' | 'ru',
        alreadyLogged?: boolean
    ) {
        this.alreadyLogged = alreadyLogged
    }

    public logout(): void {
        this.main.initAuthPage()
        this.restApi.logout()
        this.login = null
        this.alreadyLogged = false
        setTimeout(() => window.location.reload(), 1000)
    }

}