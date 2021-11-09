package ru.tenseii.bulk.service.session

enum class AppLanguage {
    RU,
    EN;

    fun getValue(): String = name.lowercase()
}