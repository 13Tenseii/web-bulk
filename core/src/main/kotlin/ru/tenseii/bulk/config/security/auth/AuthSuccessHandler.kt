package ru.tenseii.bulk.config.security.auth

import com.fasterxml.jackson.databind.ObjectMapper
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.AuthenticationSuccessHandler
import org.springframework.stereotype.Service
import ru.tenseii.bulk.config.properties.AppProperties
import ru.tenseii.bulk.service.session.SessionService
import ru.tenseii.bulk.user.SessionUser
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Service
class AuthSuccessHandler(
    private val appProperties: AppProperties,
    private val sessionService: SessionService
) : AuthenticationSuccessHandler {
    private companion object val logger: Logger = LoggerFactory.getLogger(AuthSuccessHandler::class.java)

    override fun onAuthenticationSuccess(request: HttpServletRequest,
                                         response: HttpServletResponse,
                                         authentication: Authentication) {
        request.getSession(true).maxInactiveInterval = appProperties.sessionTimeout.toInt()

        response.status = HttpStatus.OK.value()

        val properties = sessionService.getSessionProperties()
        response.writer.write(ObjectMapper().writeValueAsString(properties))

        val user = authentication.details as SessionUser
        logger.debug("Authentication success. User ${user.getName()}")
    }

}