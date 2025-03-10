/*
    Copyright 2025 DigitalSwirl-TS

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
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