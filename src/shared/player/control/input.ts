import { Player } from "..";
import { ButtonState } from "./buttonstate";
import * as VUtil from "shared/common/vutil";
import * as CFUtil from "shared/common/cfutil";
import { UserInputService } from "@rbxts/services";

type ButtonUnion = ExtractKeys<Input["Button"], ButtonState>

/**
 * @class
 */
export class Input {
    public Button
    public PlatformContext:string
    public ControllerContext:String
    public Stick

    constructor() {
        this.Button = {
            Jump: new ButtonState(),
            Spindash: new ButtonState(),
            Roll: new ButtonState(),
            Bounce: new ButtonState(),
        }

        this.BindKeyCode(this.Button.Jump, [Enum.KeyCode.Space, Enum.KeyCode.ButtonA])
        this.BindKeyCode(this.Button.Spindash, [Enum.KeyCode.E, Enum.KeyCode.LeftShift, Enum.KeyCode.ButtonX, Enum.KeyCode.ButtonB])
        this.BindKeyCode(this.Button.Roll, [Enum.KeyCode.E, Enum.KeyCode.LeftShift, Enum.KeyCode.ButtonX, Enum.KeyCode.ButtonB])
        this.BindKeyCode(this.Button.Bounce, [Enum.KeyCode.E, Enum.KeyCode.LeftShift, Enum.KeyCode.ButtonX, Enum.KeyCode.ButtonB])

        this.PlatformContext = "PC" // assume pc by default
        this.ControllerContext = "Xbox"
        this.Stick = Vector2.zero
    }

    private BindKeyCode(Input:ButtonState, KeyCode:Enum.KeyCode[]) {
        KeyCode.forEach((Key) => {
            Input.KeyCodes.push(Key)
        })
    }

    /**
     * Translates a KeyCode to a list of all binded `Input.Button`s
     * @param Key KeyCode
     * @returns List of all k
     */
    public KeyCodeToButton(Key:Enum.KeyCode) {
        const List:ButtonUnion[] = []
        for (const [Index , Button] of pairs(this.Button)) {
            const Target = Button.KeyCodes.find(Object => Object === Key)
            if (Target) {
                List.push(Index)
            }
        }

        return List
    }

    public GetInputState() {
        const KeyboardState = UserInputService.GetKeysPressed()
        const ControllerState = UserInputService.GetGamepadState(Enum.UserInputType.Gamepad1)
        const MobileState:InputObject[] = [] // TODO: automatically create mobile buttons and match them to keycodes

        return $tuple(KeyboardState, ControllerState, MobileState)
    }

    /**
     * Update input
     */
    public Update() {
        const [KeyboardState, ControllerState, MobileState] = this.GetInputState()

        let KeyList:string[] = []
        const TotalState = [KeyboardState, ControllerState, MobileState]
        TotalState.forEach((DeviceState) => {
            DeviceState.forEach((Object) => {
                if (Object.KeyCode === Enum.KeyCode.Unknown || Object.UserInputState !== Enum.UserInputState.Begin) { return }
                const List = this.KeyCodeToButton(Object.KeyCode)
                List.forEach((Key) => {
                    if (Key) {
                        if (!KeyList.find(Object => Object === Key)) {
                            KeyList.push(Key)
    
                            this.Button[Key].Update(true)
                        }
                    }
                })
            })
        })

        // Update unpressed keys
        for (const [Index, Button] of pairs(this.Button)) {
            if (Button.Activated && !KeyList.find(Object => Object === Index)) {
                Button.Update(false)
            }
        }

        // Stick
        let PCStickX = 0
        let PCStickY = 0
        let CStickX = 0
        let CStickY = 0
        
        PCStickX += UserInputService.IsKeyDown(Enum.KeyCode.A) && -1 || 0
        PCStickX += UserInputService.IsKeyDown(Enum.KeyCode.D) && 1 || 0
        PCStickY -= UserInputService.IsKeyDown(Enum.KeyCode.W) && 1 || 0
        PCStickY -= UserInputService.IsKeyDown(Enum.KeyCode.S) && -1 || 0

        ControllerState.forEach((Key) => {  
            if (Key.KeyCode === Enum.KeyCode.Thumbstick1) {
                if (Key.Position.Magnitude <= .15) { return } // TODO: customizable deadzone

                CStickX = Key.Position.X
                CStickY = -Key.Position.Y
            }
        })

        this.Stick = new Vector2(PCStickX + CStickX, PCStickY + CStickY)
        if (this.Stick.Magnitude > 0) { this.Stick = this.Stick.Unit }

        // TODO: mobile stick

        // TODO: Update platform & controller context
    }

    public PrepareReset() {
        for (const [_, Key] of pairs(this.Button)) {
            Key.CanBeUpdated = true
        }
    }

    /**
     * Convert input angle to turn value
     * @param Player 
     * @returns Current turn value
     */
    public GetTurn(Player:Player) {
        if (!game.Workspace.CurrentCamera || this.Stick.Magnitude === 0) { return 0 }

        //Get character vectors
		const tgt_up = Vector3.yAxis // TODO: camera chagne
		const look = Player.Angle.LookVector
		const up = Player.Angle.UpVector
		
		//Get camera angle, aligned to our target up vector
		let [cam_look] = VUtil.PlaneProject(game.Workspace.CurrentCamera.CFrame.LookVector, tgt_up)
		if (cam_look.Magnitude !== 0) {
            cam_look = cam_look.Unit  
        } else {
            cam_look = look
        }
		//Get move vector in world space, aligned to our target up vector
		let cam_move = CFrame.fromAxisAngle(tgt_up, math.atan2(-Player.Input.Stick.X, -Player.Input.Stick.Y)).mul(cam_look)
		
		//Update last up
		if (tgt_up.Dot(up) >= -0.999) {
            Player.Flags.LastUp = up
        }
		
		//Get final rotation and move vector
		const final_rotation = CFUtil.FromToRotation(tgt_up, Player.Flags.LastUp)
		
		let [final_move] = VUtil.PlaneProject(final_rotation.mul(cam_move), up)
		if (final_move.Magnitude !== 0) {
			final_move = final_move.Unit
		} else {
            final_move = look
        }
		
		//Get turn amount
		const turn = VUtil.SignedAngle(look, final_move, up)
		return turn
    }

    /**
     * Get all input information
     * @param Player 
     * @returns Tuple: {HasControl, StickMagnitude, PlayerTurn}
     */
    public Get(Player:Player) {
        // has_control, stick_mag, last_turn
        // TODO: has_control
        return $tuple(true && this.Stick.Magnitude !== 0, this.GetTurn(Player), this.Stick.Magnitude)
    }
}