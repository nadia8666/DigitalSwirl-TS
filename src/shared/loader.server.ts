import { Player } from "shared/player"

const LocalPlayer = game.GetService("Players").LocalPlayer
let PlayerObject:Player | undefined = undefined

function CharacterAdded() {
    const Character = LocalPlayer.Character

    assert(Character, "Character not found!")

    PlayerObject = new Player(Character)
}

function CharacterRemoving() {

}

if (LocalPlayer.Character) {
    CharacterAdded()
}

LocalPlayer.CharacterAdded.Connect(CharacterAdded)
LocalPlayer.CharacterRemoving.Connect(CharacterRemoving)

game.GetService("RunService").BindToRenderStep("ControlScript_Update", Enum.RenderPriority.Input.Value - 1, (DeltaTime:number) => {
    if (PlayerObject) {
        PlayerObject.Update()
    }
})