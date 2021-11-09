package ru.tenseii.bulk.user

import ru.tenseii.bulk.service.session.AppLanguage

class AuthorizedSessionUser(
    private val name: String,
    private val roles: List<String>,
    private var lang: AppLanguage
) : SessionUser {

    override fun getName() = name

    override fun getRoles() = roles

    override fun getLanguage() = lang

    override fun setLanguage(lang: AppLanguage) {
        this.lang = lang
    }
}