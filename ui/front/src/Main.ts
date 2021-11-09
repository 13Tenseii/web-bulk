import App from "@plastique/core/base/App";
import EntryPoint from "@plastique/core/base/EntryPoint";
import Reactive from "@plastique/core/component/Reactive";
import AppDto from "./dto/AppDto";
import RestApi from "./api/RestApi";
import Bean from "@plastique/core/base/Bean";
import User from "./user/User";
import Component from "@plastique/core/component/Component";
import AuthPage from "./page/auth/AuthPage";
import MainPage from "./page/main/MainPage";
import Listener from "@plastique/core/event/Listener";
import RemoteAppsRestApi from "./api/RemoteAppsRestApi";

@EntryPoint
@Reactive(function (this: Main) {`
<div xmlns:v="http://github.com/codeplastique/plastique" class="Main">
    <div v:component="${this.currentComponent}"></div>
</div>
`})
class Main extends App {
    private readonly user: User
    private currentComponent: Component

    constructor(element: HTMLElement, data: AppDto = {} as AppDto) {
        super(element, data.appContext);
        this.user = data.user
            ? new User(data.user.login, data.lang, true)
            : new User()

        this.currentComponent = data.user == null ? new AuthPage() : new MainPage()
    }

    public initAuthPage(): void {
        this.currentComponent = new AuthPage()
    }

    @Listener(AuthPage.LOGIN_EVENT)
    private onLoginEvent(props: AppDto): void {
        this.user.login = props.user.login
        this.user.locale = props.lang
        this.currentComponent = new MainPage()
    }


    @Bean
    public getRestApi(): RestApi {
        return new RestApi()
    }

    @Bean
    public getRemoteAppsRestApi(): RemoteAppsRestApi {
        return new RemoteAppsRestApi()
    }

    @Bean
    public getUser(): User {
        return this.user
    }
}

export default Main;