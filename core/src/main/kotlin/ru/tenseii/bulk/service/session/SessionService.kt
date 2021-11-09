package ru.tenseii.bulk.service.session

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.tenseii.bulk.service.session.user.SessionUserService
import ru.tenseii.bulk.api.dto.SessionPropertiesDto
import ru.tenseii.bulk.api.dto.SessionUserDto
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletRequest

private const val LANG_COOKIE_NAME = "lang"

@Service
class SessionService(
    @Autowired(required = false)
    private val request: HttpServletRequest,
    private val sessionUserService: SessionUserService
) {

    fun getSessionProperties(): SessionPropertiesDto {
        return if (sessionUserService.isUserExists()) {
            val user = sessionUserService.getUser()
            SessionPropertiesDto(
                SessionUserDto(user.getName()),
                user.getLanguage().getValue(),
                request.contextPath
            )
        } else
            SessionPropertiesDto(null, request.contextPath,  getLanguage().getValue())
    }

    fun getLanguage(): AppLanguage {
        val lang: String = request.cookies
            ?.firstOrNull{ it.equals(LANG_COOKIE_NAME)}?.value
            ?: request.locale.language
        return getLanguage(lang)
    }

    fun getLanguage(lang: String) = AppLanguage.valueOf(lang.uppercase())

    fun setLanguage(lang: String): Cookie {
        val language = getLanguage(lang)
        sessionUserService.getUser().setLanguage(language)
        val cookie = Cookie(LANG_COOKIE_NAME, language.getValue())
        cookie.maxAge = Int.MAX_VALUE
        return cookie
    }

    fun isUserAuthorized() = sessionUserService.isUserExists()

}