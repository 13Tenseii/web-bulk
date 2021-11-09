import Reactive from "@plastique/core/component/Reactive";
import Component from "@plastique/core/component/Component";
import AppItem from "./AppItem";
import User from "../../../user/User";
import Autowired from "@plastique/core/base/Autowired";
import RestApi from "../../../api/RestApi";
import Notifier from "../../../util/Notifier";
import I18n from "@plastique/core/utils/I18n";
import Listener from "@plastique/core/event/Listener";
import RedirectInfoDto from "../../../dto/RedirectInfoDto";
import RemoteAppsRestApi from "../../../api/RemoteAppsRestApi";

@Reactive(function (this: AppsHolder) {
let item: AppItem;
`<div xmlns:v="http://github.com/codeplastique/plastique" class="Apps-holder">
    <div class="Apps-holder__items">
        <div v:component="${item}"
             v:each="item : ${this.itemsArray}">
        </div>
    </div>
</div>
`})
class AppsHolder {
    @Autowired private readonly user: User
    @Autowired private readonly restApi: RestApi
    @Autowired private readonly remoteAppsRestApi: RemoteAppsRestApi

    private readonly itemsArray: Array<AppItem> = []

    private isLoading: boolean

    constructor() {
        this.isLoading = true
        this.restApi.getPermittedAppsInfo()
            .then(resp => {
                resp.data.forEach(app => this.itemsArray.push(new AppItem(app.id, app.name)))
            })
            .catch(() => Notifier.error(I18n.text("err_get_app_links")))
            .finally(() => this.isLoading = false)
    }

    @Listener(AppItem.ITEM_SELECT_EVENT)
    private appSelectListener(appId: number) {
        this.restApi.getRedirectInfo(appId)
            .then(resp => this.redirectWithInfo(resp.data))
            .catch(() => Notifier.error(I18n.text("err_get_redirect_info")))
    }

    private redirectWithInfo(redirectInfoDto: RedirectInfoDto) {
        this.remoteAppsRestApi.redirectWithInfo(
            redirectInfoDto.name, redirectInfoDto.roles,
            redirectInfoDto.link, redirectInfoDto.token
        )
    }

}

export default AppsHolder
interface AppsHolder extends Component{}