package controllers

import play.api._
import play.api.libs.json._
import play.modules.reactivemongo.json.BSONFormats._
import play.api.libs.json.Json.JsValueWrapper
import play.api.mvc._
import play.modules.reactivemongo.MongoController
import play.modules.reactivemongo.json.collection.JSONCollection
import play.twirl.api.Html
import reactivemongo.api.Cursor
import reactivemongo.bson.BSONObjectID
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

import scala.io.Source

object Application extends Controller with MongoController {

  def $(a: (String, JsValueWrapper)*) = Json.obj(a: _*)
  val idReads : Reads[String] = (JsPath \ "_id").read[String]

  def collection(repo: String): JSONCollection = db.collection[JSONCollection](repo)

  def index = Action {
    Ok(views.html.index())
  }

  def htmlVendor(repo: String) = Action {
    Ok(views.html.display(repo))
  }

  def create(repo: String) = Action.async(parse.json) { implicit req =>
    collection(repo).insert(req.body)
    Future.successful(Ok)
  }

  def selectAll(repo: String) = Action.async {
    val cursor: Cursor[JsObject] = db.collection[JSONCollection](repo).find(Json.obj()).cursor[JsObject]
    val futureSlavesList: Future[List[JsObject]] = cursor.collect[List]()
    futureSlavesList.map { slaves =>
      Ok(Json.toJson(slaves))
    }
  }

  def delete(repo: String) = Action.async(parse.json) { implicit req =>
    req.body.validate[String](idReads).map{ id =>
      println(id)
      collection(repo).remove($("_id" -> BSONObjectID(id))).map( last => Ok("Niby ok"))
    } getOrElse { Future.successful(BadRequest("BadJSon"))}
  }

  def update(repo: String) = Action.async(parse.json) { implicit req =>
    req.body.validate[String](idReads).map{ id =>
      val newValues = req.body.as[JsObject] - "_id"
      collection(repo).update($("_id" -> BSONObjectID(id)),$("$set" -> newValues)).map { _=> Ok("Success")}
    } getOrElse { Future.successful(BadRequest("BadJSon"))}
  }
}