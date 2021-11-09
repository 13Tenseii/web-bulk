import RestService from "@plastique/core/http/RestService";
import HttpRequest from "@plastique/core/http/HttpRequest";
import HttpResponse from "@plastique/core/http/HttpResponse";
import AppDto from "../dto/AppDto";
import UrlEncodedRequestContent from "@plastique/core/http/content/UrlEncodedRequestContent";
import SimpleMap from "@plastique/core/collection/map/SimpleMap";
import TextRequestContent from "@plastique/core/http/content/TextRequestContent";
import RedirectInfoDto from "../dto/RedirectInfoDto";
import AppInfoDto from "../dto/AppInfoDto";

export default class RestApi extends RestService {
    private static readonly apiUrl = "api/web"

    protected call<T>(req: HttpRequest): Promise<HttpResponse<T>> {
        return super.call(req).catch(resp => {
            console.error(resp);
            return Promise.reject(resp);
        }) as Promise<HttpResponse<T>>;
    }

    public signIn(login: string, password: string): Promise<HttpResponse<AppDto>> {
        return this.call(new HttpRequest(
            "login",
            "POST",
            new UrlEncodedRequestContent(SimpleMap.of(
                "username", login,
                "password", password
            ))
        ))
    }

    public logout(): Promise<HttpResponse<any>> {
        return this.call(new HttpRequest(
            "logout",
            "POST"
        ))
    }

    public changeLocale(localeCode: string): Promise<HttpResponse<void>> {
        return this.call(new HttpRequest(
            'locale',
            'POST',
            new TextRequestContent(localeCode)
        ))
    }

    public getPermittedAppsInfo(): Promise<HttpResponse<Array<AppInfoDto>>> {
        return this.call(new HttpRequest(
            RestApi.apiUrl + "/apps",
            "GET"
        ))
    }

    public getRedirectInfo(appId: number): Promise<HttpResponse<RedirectInfoDto>> {
        return this.call(new HttpRequest(
            RestApi.apiUrl + "/redirect-info/".concat(appId.toString()),
            "GET"
        ))
    }

    public handleRedirectFromApp(appId: number): Promise<HttpResponse<RedirectInfoDto>> {
        return this.call(new HttpRequest(
            RestApi.apiUrl + "/redirect/".concat(appId.toString()),
            "GET"
        ))
    }
}