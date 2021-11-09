package ru.tenseii.bulk.service.session.user

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import ru.tenseii.bulk.user.SessionUser
import javax.naming.ServiceUnavailableException

@Service
class WebSessionUserService : SessionUserService {

    override fun getUser(): SessionUser {
        val auth = SecurityContextHolder.getContext().authentication
        return auth.details?.let { it as SessionUser }
            ?: throw ServiceUnavailableException("No details for authorized user!")
    }

    override fun isUserExists(): Boolean {
        val auth = SecurityContextHolder.getContext().authentication
        return auth != null && auth.details != null && auth.details is SessionUser
    }
}