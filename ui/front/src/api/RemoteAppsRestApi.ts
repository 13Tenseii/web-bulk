import RestService from "@plastique/core/http/RestService";
import HttpRequest from "@plastique/core/http/HttpRequest";
import HttpResponse from "@plastique/core/http/HttpResponse";
import RedirectInfoDto from "../dto/RedirectInfoDto";
import JsonRequestContent from "@plastique/core/http/content/JsonRequestContent";
import RemoteAppUserInfoDto from "../dto/RemoteAppUserInfoDto";

export default class RemoteAppsRestApi extends RestService {
    private static readonly apiUrl = "/api/s-auth"

    protected call<T>(req: HttpRequest): Promise<HttpResponse<T>> {
        return super.call(req).catch(resp => {
            console.error(resp);
            return Promise.reject(resp);
        }) as Promise<HttpResponse<T>>;
    }

    public redirectWithInfo(name: String, roles: Array<String>,
                            link: String, token: String): Promise<HttpResponse<any>> {
        const obj = {name: name, roles: roles, token: token} as RemoteAppUserInfoDto
        return this.call(new HttpRequest(
                this.buildUrl(link),
                "POST",
                new JsonRequestContent(obj)
            )
        )
    }

    private buildUrl(link: String): string {
        return link + RemoteAppsRestApi.apiUrl
    }
}