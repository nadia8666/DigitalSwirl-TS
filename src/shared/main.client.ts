import { Player } from "shared/player"

const LocalPlayer = game.GetService("Players").LocalPlayer
let PlayerObject:Player | undefined = undefined

function CharacterAdded() {
    const Character = LocalPlayer.Character

    assert(Character, "Character not found!")

    PlayerObject = new Player(Character)
}

if (LocalPlayer.Character) {
    CharacterAdded()
}

LocalPlayer.CharacterAdded.Connect(CharacterAdded)

game.GetService("RunService").BindToRenderStep("ControlScript_Update", Enum.RenderPriority.Input.Value - 1, function(DeltaTime:number) {
    
})