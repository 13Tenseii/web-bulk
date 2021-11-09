package ru.tenseii.bulk.service.session.user

import ru.tenseii.bulk.user.SessionUser


interface SessionUserService {
    fun getUser(): SessionUser
    fun isUserExists(): Boolean
}