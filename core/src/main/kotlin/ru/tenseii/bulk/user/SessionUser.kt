package ru.tenseii.bulk.user

import ru.tenseii.bulk.service.session.AppLanguage

interface SessionUser {
    fun getName(): String
    fun getRoles(): List<String>
    fun getLanguage(): AppLanguage
    fun setLanguage(lang: AppLanguage)
}