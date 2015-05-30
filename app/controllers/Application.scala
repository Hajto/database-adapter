package controllers

import java.text.SimpleDateFormat
import java.util.Calendar

import model.{FuneralSchedule, Funeral}
import model.formats._
import play.api._
import play.api.libs.json.Json
import play.api.mvc._
import play.twirl.api.Html
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

import scala.io.Source

object Application extends Controller {

  def index = Action.async {
    Future.successful(Ok)
  }
}