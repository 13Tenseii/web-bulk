package ru.tenseii.bulk.user

enum class UserRole(val id: Int) {
    ADMIN(0),
    USER(1);

    fun getById(id: Int) = values().first { it.id == id }
}