port module Main exposing (..)

import Json.Encode as E
import Browser
import Html exposing (Html, button, div, text, img)
import Html.Attributes exposing (class, style, src)
import Html.Events exposing (onMouseEnter, onMouseLeave)

port beep : E.Value -> Cmd msg

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
                img [style "display" "none", src dr.src] []
                ]

-- MODEL

type alias Model = {
        doors : List Door
        }

-- UPDATE

type alias Msg = {id : String, doorState : DoorState}

updateSend : Msg -> Model -> (Model, Cmd msg)
updateSend msg model =
  ({ model | doors = updateDoors msg model.doors }, beep (E.int 5))

update msg model =
        updateSend msg model

updateDoors : Msg -> List Door -> List Door
updateDoors msg drs =
  List.map (\dr -> if msg.id == dr.id then { dr | state = msg.doorState } else dr) drs

-- VIEW

view model =
  div [ style "width" "100%" ] (List.map doorDiv model.doors)


main =
  Browser.element { init = init, update = update, view = view, subscriptions = subscriptions }

init : () -> (Model, Cmd Msg)
init _ = ({
    doors = [{
    id = "bloo",
    src = "assets/eye.png",
    state = Open}]},
    beep (E.int 5))

-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none

