import Reactive from "@plastique/core/component/Reactive";
import Component from "@plastique/core/component/Component";
import Autowired from "@plastique/core/base/Autowired";
import RestApi from "../../../api/RestApi";
import AppEvent from "@plastique/core/event/AppEvent";
import InitEvent from "@plastique/core/event/InitEvent";

@Reactive(function (this: AppItem) {`
<div xmlns:v="http://github.com/codeplastique/plastique"
     class="App-item"
     v:classappend="${this.isClicked ? 'App-item__clicked' : ''}"
     v:onclick="${this.onClick}">
    <div class="App-item__content">
        <span class="App-item__label" v:text="${this.appName}"></span>
    </div>
</div>
`})
class AppItem {
    @InitEvent public static readonly ITEM_SELECT_EVENT: AppEvent<any>

    private isClicked: boolean

    constructor(private readonly appId: number,
                private readonly appName: string) {
    }

    private onClick() {
        this.isClicked = true
        setTimeout(() => this.isClicked = false, 5000)
        this.fireEventOnParents(AppItem.ITEM_SELECT_EVENT, this.appId)
    }

}

export default AppItem
interface AppItem extends Component{}