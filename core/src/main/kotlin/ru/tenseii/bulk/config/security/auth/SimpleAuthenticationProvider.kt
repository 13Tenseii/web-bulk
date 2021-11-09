package ru.tenseii.bulk.config.security.auth

import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Service

@Service
class SimpleAuthenticationProvider(

) : AuthenticationProvider {
    override fun authenticate(p0: Authentication?): Authentication {
        TODO("Not yet implemented")
    }

    override fun supports(p0: Class<*>?): Boolean {
        TODO("Not yet implemented")
    }

}
