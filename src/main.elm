import Browser
import Html exposing (Html, button, div, text, img)
import Html.Attributes exposing (class, style, src)
import Html.Events exposing (onMouseIn, onMouseOut)

type BoxShape = Tall | Wide | Square

type DoorState = Open | Closed
type alias Door = {
        id : String,
        closedSrc : String,
        openSrc : String,
        state : DoorState
    }

door : Door -> Html Msg
door dr =
        case dr.state of
                Open -> doorDiv dr.openSrc
                Closed -> doorDiv dr.closedSrc

doorDiv : String -> Html Msg
doorDiv source =
        div [
                class "door"
                on
                ] [
                img [src source] []
                ]
main =
  Browser.sandbox { init = 0, update = update, view = view }

type Msg = Increment | Decrement

type alias Model = {
        doors : List Door
        }

update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1

view model =
  div [ style "width" "100%" ] [
    ]
