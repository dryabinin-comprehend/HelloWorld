

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import spray.json._

// domain model
final case class Name(name: String)

// collect json format instances into a support trait:
trait JsonSupport extends SprayJsonSupport with DefaultJsonProtocol {
  implicit val itemFormat = jsonFormat1(Name)
}

object Server extends App with JsonSupport {

  implicit val system: ActorSystem = ActorSystem("helloWorld")
  implicit val executionContext = system.dispatcher
  implicit val materializer: ActorMaterializer = ActorMaterializer()

  val host = "0.0.0.0"
  val port = 9000

  val route =
    path("hello") {
      getFromResource("index.html")
    } ~
      path("bundle.js") {

        getFromResource("static/bundle.js")
      } ~
      path("bundle.css") {
        getFromResource("static/bundle.css")
      } ~
      post {
        path("hello") {
          entity(as[Name]) { item =>
            complete(Name(item.name))
          }
        }

      }

  Http().bindAndHandle(route, host, port)
  println(s"Server online at http://localhost:9000/\n")
}