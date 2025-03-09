import { Player } from "..";
import { ButtonState } from "./buttonstate";

export class Input {
    public Button
    public PlatformContext:string
    public ControllerContext:String

    constructor() {
        this.Button = {
            Jump: new ButtonState()
        }

        this.BindKeyCode(this.Button.Jump, [Enum.KeyCode.Space, Enum.KeyCode.ButtonA])

        this.PlatformContext = "PC" // assume pc by default
        this.ControllerContext = "Xbox"
    }

    public BindKeyCode(Input:ButtonState, KeyCode:Enum.KeyCode[]) {
        KeyCode.forEach((Key) => {
            Input.KeyCodes.push(Key)
        })
    }

    public KeyCodeToButton(Key:Enum.KeyCode) {
        for (const [Index , Button] of pairs(this.Button)) {
            const Target = Button.KeyCodes.find(Object => Object === Key)
            if (Target) {
                return Index
            }
        }
    }

    public Update() {
        const KeyboardState = game.GetService("UserInputService").GetKeysPressed()
        const ControllerState = game.GetService("UserInputService").GetGamepadState(Enum.UserInputType.Gamepad1)
        const MobileState:InputObject[] = [] // TODO: automatically create mobile buttons and match them to keycodes

        let KeyList:string[] = []
        const TotalState = [KeyboardState, ControllerState, MobileState]
        TotalState.forEach((DeviceState) => {
            DeviceState.forEach((Object) => {
                if (Object.KeyCode === Enum.KeyCode.Unknown || Object.UserInputState !== Enum.UserInputState.Begin) { return }
                const Key = this.KeyCodeToButton(Object.KeyCode)
                if (Key) {
                    if (!KeyList.find(Object => Object === Key)) {
                        KeyList.push(Key)

                        this.Button[Key].Update(true)
                    }
                }
            })
        })

        // Update unpressed keys
        for (const [Index, Button] of pairs(this.Button)) {
            if (Button.Activated && !KeyList.find(Object => Object === Index)) {
                Button.Update(false)
            }
        }

        // TODO: Update platform & controller context
    }
}