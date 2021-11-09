package ru.tenseii.bulk.config.properties

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration
import org.springframework.stereotype.Component

@Configuration
@ConfigurationProperties("application")
class AppProperties {
    lateinit var sessionTimeout: String
}