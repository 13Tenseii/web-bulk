import Component from "@plastique/core/component/Component";
import Reactive from "@plastique/core/component/Reactive";
import AppEvent from "@plastique/core/event/AppEvent";
import AppDto from "../../dto/AppDto";
import InitEvent from "@plastique/core/event/InitEvent";
import RestApi from "../../api/RestApi";
import Autowired from "@plastique/core/base/Autowired";
import Md5 from "plastique-components/utils/Md5";
import Notifier from "../../util/Notifier";
import I18n from "@plastique/core/utils/I18n";

@Reactive(function (this: AuthPage){`
<div xmlns:v="http://github.com/codeplastique/plastique" class="Auth-page">
    <div class="Auth-page__login-form">
        <div class="Auth-page__label">
            <i class="fas fa-feather-alt"></i>
            <span class="ml-2" v:text="#{app_name}"></span>
        </div>
        <div class="Auth-page__flex-row">
            <label class="Auth-page__icon"><i class="far fa-user"></i></label>
            <input id="username"
                   type="text"
                   class="Auth-page__input"
                   v:model="${this.login}"
                   v:placeholder="#{login}"
                   v:classappend="${this.isValidLogin() ? '' : 'is-invalid'}">
        </div>
        <div class="Auth-page__flex-row">
            <label class="Auth-page__icon"><i class="fas fa-key"></i></label>
            <input id="password"
                   type="password"
                   class="Auth-page__input"
                   v:model="${this.password}"
                   v:placeholder="#{password}"
                   v:classappend="${this.isValidPassword() ? '' : 'is-invalid'}">
        </div>
        <input class="Auth-page__submit-btn" type="submit" v:onclick="${this.signIn}" value="LOGIN"/>
    </div>
</div>
`})
class AuthPage {
    @InitEvent public static readonly LOGIN_EVENT: AppEvent<AppDto>

    @Autowired private readonly restApi: RestApi

    private login: string = ''
    private password: string = ''
    private isLoading: boolean
    private isValid: boolean

    public signIn(): void {
        this.isValid = true
        if (this.isValidLogin() && this.isValidPassword()) {
            this.isLoading = true
            // let hashedPassword = Md5.hash(this.password)
            this.restApi.signIn(this.login, this.password)
                .then(resp => this.fireEventOnParents(AuthPage.LOGIN_EVENT, resp.data))
                .catch(() => Notifier.error(I18n.text("bad_credentials")))
                .finally(() => this.isLoading = false)
        }
    }

    private isValidLogin() {
        return this.isValid ? this.login.trim().length != 0 : true
    }

    private isValidPassword() {
        return this.isValid ? this.password.trim().length != 0 : true
    }
}

export default AuthPage
interface AuthPage extends Component{}