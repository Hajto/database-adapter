package controllers

import play.api._
import play.api.libs.json.{JsArray, Json, JsObject}
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

  def collection: JSONCollection = db.collection[JSONCollection]("movies")

  def $(a:(String,JsValueWrapper)*) = Json.obj(a:_*)

  def index = Action{
    Ok(views.html.index())
  }

  def create = Action.async(parse.json){ implicit req =>
    collection.insert(req.body)
    Future.successful(Ok)
  }

  def selectAll = Action.async{
    val cursor: Cursor[JsObject] = collection.find(Json.obj()).cursor[JsObject]
    val futureSlavesList: Future[List[JsObject]] = cursor.collect[List]()
    futureSlavesList.map { slaves =>
      Ok(Json.toJson(slaves))
    }
  }

  def smth = Action.async {
    val id = "5569fa07ad9c1de89ec72a5f"
    val feedSelector = $("_id" -> BSONObjectID(id))

    collection.update(feedSelector,$("$set" -> $("stuff"-> "another")))
    //collection.insert(Json.obj("stuff"->"thing"))
    Future.successful(Ok)
  }
}