import { AddLog } from "shared/common/logger"
import { Camera } from "./draw/camera"
import { Renderer } from "./draw/renderer"
import { StateMachine } from "./statemachine"
import * as Render from "shared/common/renderregistry"

export class Player {
    public readonly State: StateMachine
    public Position: Vector3
    public Angle: CFrame
    public Camera: Camera
    public Renderer: Renderer
    public Character: Model

    constructor(Character: Model) {
        this.Character = Character
        this.Position = Character.GetPivot().Position
        this.Angle = Character.GetPivot().Rotation
        this.State = new StateMachine(this)
        this.Camera = new Camera(this)
        this.Renderer = new Renderer(this)

        Render.RegisterStepped("Player", Enum.RenderPriority.Input.Value + 1, () => this.Update())

        AddLog(`Loaded new player ${Character}`)
    }

    public Destroy() {

    }

    public Update() {
        
        // Update state machine
        this.State.Update()

        this.Renderer.Draw()
    }
}