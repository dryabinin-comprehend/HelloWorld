

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import spray.json._

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
      path("favicon.ico") {
        getFromResource("favicon.ico")
      } ~
      post {
        path("hello") {
          entity(as[Name]) { item =>
            var name = item.name
            Thread.sleep(500) // For loading on frontend puproses
            complete(s"<div> Welcome to the system, $name </div>")
          }
        }

      }

  var bindingFuture = Http().bindAndHandle(route, host, port).recoverWith {
    case _ => sys.exit(1)
  }

  sys.addShutdownHook(
    bindingFuture.map(_.unbind())
  )
  println(s"Server online at http://localhost:$port/\n")
}