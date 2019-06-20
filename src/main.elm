import Browser
import Html exposing (Html, button, div, text, img)
import Html.Attributes exposing (class, style, src)
import Html.Events exposing (onClick)

type BoxShape = Tall | Wide | Square

type alias IndexBox = { backImage : String, shape : BoxShape }

indexBox : IndexBox -> Html Msg
indexBox ib =
  div [] [
    img [src ib.backImage, class "index-box"] []
    ]

main =
  Browser.sandbox { init = 0, update = update, view = view }

type Msg = Increment | Decrement

update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1

view model =
  div [] [
    indexBox {backImage = "assets/bloo.png", shape = Tall}
    ]
