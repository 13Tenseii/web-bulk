import Component from "@plastique/core/component/Component";
import Reactive from "@plastique/core/component/Reactive";
import AppEvent from "@plastique/core/event/AppEvent";
import InitEvent from "@plastique/core/event/InitEvent";

@Reactive(function (this: Menu) {`
<div xmlns:v="http://github.com/codeplastique/plastique" class="Menu">
    <div class="Menu__content">
        <div class="Menu__list">
            <div class="Menu__header" v:text="#{navigation}"></div>
            <div class="Menu__list__item Menu__list__item-active" 
                v:onclick="${this.onItemSelect}">
                <i class="Menu__list__item__icon fas fa-rocket"></i>
                <span v:text="#{apps_board}"></span>
            </div>
            
        </div>
    </div>
</div>
`})
class Menu {
    @InitEvent public static readonly MENU_SELECT_EVENT: AppEvent<any>

    private onItemSelect() {
        this.fireEventOnParents(Menu.MENU_SELECT_EVENT)
    }
}

export default Menu
interface Menu extends Component{}