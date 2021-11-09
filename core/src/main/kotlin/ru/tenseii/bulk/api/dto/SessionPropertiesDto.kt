package ru.tenseii.bulk.api.dto

class SessionPropertiesDto(
    val user: SessionUserDto?,
    val lang: String,
    val appContext: String
)
