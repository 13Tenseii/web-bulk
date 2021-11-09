package ru.tenseii.bulk.config.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import ru.tenseii.bulk.config.security.auth.AuthFailHandler
import ru.tenseii.bulk.config.security.auth.AuthSuccessHandler
import ru.tenseii.bulk.config.security.auth.SimpleAuthenticationProvider

@EnableWebSecurity
open class SecurityConfiguration : WebSecurityConfigurerAdapter() {

    @Autowired lateinit var authFailHandler: AuthFailHandler
    @Autowired lateinit var authSuccessHandler: AuthSuccessHandler
    @Autowired lateinit var provider: SimpleAuthenticationProvider

    override fun configure(http: HttpSecurity) {
        http
            .csrf().disable()
            .authorizeRequests()
            .antMatchers(HttpMethod.GET, "/").permitAll()
            .anyRequest().permitAll()
        .and()
            .formLogin()
            .loginPage("/")
            .loginProcessingUrl("/login")
            .defaultSuccessUrl("/", true)
            .successHandler(authSuccessHandler)
            .failureHandler(authFailHandler)
            .permitAll()
        .and()
            .logout()
            .logoutUrl("/logout")
            .logoutSuccessUrl("/")
    }

    override fun configure(auth: AuthenticationManagerBuilder) {
        auth.authenticationProvider(provider)
    }
}