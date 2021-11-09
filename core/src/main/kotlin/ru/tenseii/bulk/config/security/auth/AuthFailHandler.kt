package ru.tenseii.bulk.config.security.auth

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.AuthenticationServiceException
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.authentication.AuthenticationFailureHandler
import org.springframework.stereotype.Service
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Service
class AuthFailHandler : AuthenticationFailureHandler {
    private companion object val logger: Logger = LoggerFactory.getLogger(AuthFailHandler::class.java)

    override fun onAuthenticationFailure(
        request: HttpServletRequest,
        response: HttpServletResponse,
        exc: AuthenticationException
    ) {
        val status = when (exc) {
            is BadCredentialsException -> HttpStatus.FORBIDDEN
            is AuthenticationServiceException -> HttpStatus.SERVICE_UNAVAILABLE
            else -> HttpStatus.INTERNAL_SERVER_ERROR
        }
        response.status = status.value()
        logger.error("Authentication failed", exc)
    }
}