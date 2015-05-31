package model

import play.api.libs.json.Json

case class Slave(isAwesome: Boolean, name: String, surname: String, nickname: String, age: Int, zirytowanie: Int, stupidity: Int)

object Schemes {
  val slaveFormat = Json.format[Slave]
}
