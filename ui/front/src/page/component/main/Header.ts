import Component from "@plastique/core/component/Component";
import Reactive from "@plastique/core/component/Reactive";
import DropdownOption from "plastique-components/dropdown/DropdownOption";
import Dropdown from "plastique-components/dropdown/Dropdown";
import Autowired from "@plastique/core/base/Autowired";
import User from "../../../user/User";
import RestApi from "../../../api/RestApi";
import Listener from "@plastique/core/event/Listener";

@Reactive(function (this: Header) {`
<div xmlns:v="http://github.com/codeplastique/plastique" class="Header">
    <div class="Header__label">
        <i class="fas fa-feather-alt"></i>
        <span class="ml-2" v:text="#{app_name}"></span>
    </div>
    <div class="Header__user">
        <div class="mr-2">
            <i class="fas fa-user"></i>
            <span v:text="${this.user.login}" ></span>
        </div>
    </div>
    <div class="Header__lang mr-1 Menu__transparent">
        <div v:component="${this.languageDropDown}" 
             v:classappend="'Dropdown_menu '" 
             v:style="'background: transparent'"></div>
    </div>
    <button class="Header__logout-btn" v:onclick="${this.logout}">
        <i class="fas fa-sign-out-alt"></i>
    </button>
</div>
`})
class Header {
    @Autowired private readonly user: User
    @Autowired private readonly restApi: RestApi

    private readonly languageDropDown: Dropdown<any>


    constructor() {
        let options = [
            new DropdownOption('ru', 'Ru'),
            new DropdownOption('en', 'En')
        ]
        this.languageDropDown = new Dropdown(
            options,
            this.user.locale,
            false,
            true
        )

    }

    @Listener(Dropdown.SELECT_OPTION_EVENT)
    private changeLocale(option: DropdownOption<string>, dropdown: Dropdown<any>): void {
        if(dropdown == this.languageDropDown && option.value != this.user.locale) {
            this.restApi.changeLocale(option.value).then(() => {
                location.reload();
            })
        }
    }

    private logout(): void{
        this.user.logout();
    }
}

export default Header
interface Header extends Component{}