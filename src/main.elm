import Browser
import Html exposing (Html, button, div, text, img)
import Html.Attributes exposing (class, style, src)
import Html.Events exposing (onMouseEnter, onMouseLeave)

type DoorState = Open | Closed
type alias Door = {
        id : String,
        src : String,
        state : DoorState
    }

doorDiv : Door -> Html Msg
doorDiv dr =
  case dr.state of
    Open ->
        div [
                class "door",
                onMouseEnter {id = dr.id, doorState = Open},
                onMouseLeave{id = dr.id, doorState = Closed}
                ] [
                img [src dr.src] []
                ]
    Closed ->
        div [
                class "door",
                onMouseEnter {id = dr.id, doorState = Open},
                onMouseLeave{id = dr.id, doorState = Closed}
                ] [
                img [style "display" "none", src dr.src] [],
                text "a"
                ]

-- MODEL

type alias Model = {
        doors : List Door
        }

-- UPDATE

type alias Msg = {id : String, doorState : DoorState}

update : Msg -> Model -> Model
update msg model =
  { model | doors = updateDoors msg model.doors }

updateDoors : Msg -> List Door -> List Door
updateDoors msg drs =
  List.map (\dr -> if msg.id == dr.id then { dr | state = msg.doorState } else dr) drs

-- VIEW

view model =
  div [ style "width" "100%" ] (List.map doorDiv model.doors)


main =
  Browser.sandbox { init = {doors = [{
    id = "bloo",
    src = "assets/eye.png",
    state = Closed
  }]}, update = update, view = view }
