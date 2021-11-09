import Component from "@plastique/core/component/Component";
import Reactive from "@plastique/core/component/Reactive";
import Autowired from "@plastique/core/base/Autowired";
import User from "../../user/User";
import RestApi from "../../api/RestApi";
import Dropdown from "plastique-components/dropdown/Dropdown";
import DropdownOption from "plastique-components/dropdown/DropdownOption";
import Listener from "@plastique/core/event/Listener";
import AppsHolder from "../component/main/AppsHolder";
import Header from "../component/main/Header";
import Menu from "../component/main/Menu";

@Reactive(function (this: MainPage) {`
<div xmlns:v="http://github.com/codeplastique/plastique" class="Main-page">
    <div class="Main-page__header">
        <div v:if="${this.headerComponent}" v:component="${this.headerComponent}"></div>
    </div>
    <div class="Main-page__body">
        <div class="Main-page__menu">
            <div v:component="${this.menuComponent}" v:if="${this.menuComponent}"></div>
        </div>
        <div class="Main-page__content">
            <div v:component="${this.currentComponent}" v:if="${this.currentComponent}"></div>
        </div>
    </div>
</div>
`})
class MainPage {
    private readonly headerComponent: Component = new Header()
    private readonly menuComponent: Component = new Menu()
    private currentComponent: Component = new AppsHolder()

    @Listener(Menu.MENU_SELECT_EVENT)
    private refreshCurrentComponent() {
        this.currentComponent = new AppsHolder()
    }


}

export default MainPage
interface MainPage extends Component{}