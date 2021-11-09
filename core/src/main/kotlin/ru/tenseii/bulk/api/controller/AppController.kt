package ru.tenseii.bulk.api.controller

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.ModelAndView
import ru.tenseii.bulk.service.session.SessionService
import javax.servlet.http.HttpServletResponse

@Controller
class AppController(
    private val sessionService: SessionService
){

    @GetMapping(value = ["/", "*"])
    fun main(): ModelAndView {
        val properties = sessionService.getSessionProperties()
        val jsonProps = ObjectMapper().writeValueAsString(properties)
        val params = mapOf(
            "lang" to "en",
            "data" to jsonProps
        )
        return ModelAndView("App", params)
    }

    @PostMapping(value = ["/locale"])
    @ResponseStatus(value = HttpStatus.OK)
    fun changeLocale(@RequestBody lang: String, response: HttpServletResponse) {
        val langCookie = sessionService.setLanguage(lang)
        response.addCookie(langCookie)
    }
}