import { AddLog } from "shared/common/logger"
import { Camera } from "./draw/camera"
import { Renderer } from "./draw/renderer"
import { StateMachine } from "./statemachine"
import * as Render from "shared/common/renderregistry"
import { Input } from "./control/input"
import { CharacterInfo } from "shared/characterinfo"

export class DefaultFlags {
    public Grounded
    
    public Floor:BasePart|undefined
    public FloorLast:CFrame|undefined
    public FloorOffset:CFrame|undefined
    public FloorSpeed

    public Gravity:Vector3

    constructor() {
        this.Grounded = false

        this.Floor = undefined
        this.FloorLast = undefined
        this.FloorOffset = undefined
        this.FloorSpeed = Vector3.zero

        this.Gravity = new Vector3(0, -1, 0)
    }
}

export class Player {
    // Main
    public Character: Model
    public Position: Vector3
    public Speed: Vector3
    public Angle: CFrame
    
    // Character info
    public Physics

    // Flags
    public Flags:DefaultFlags

    // Modules
    public readonly State: StateMachine
    public Camera: Camera
    public Renderer: Renderer
    public Input: Input

    constructor(Character: Model) {        
        this.Character = Character
        this.Position = Character.GetPivot().Position
        this.Angle = Character.GetPivot().Rotation
        this.Speed = Vector3.zero

        this.Physics = CharacterInfo.Physics

        this.State = new StateMachine(this)
        this.Camera = new Camera(this)
        this.Renderer = new Renderer(this)
        this.Input = new Input()


        this.Flags = new DefaultFlags()

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

    // Utility functions
    public GetAngle() {
        return this.Angle.add(this.Position)
    }

    public ToLocal(Vector:Vector3) {
        return this.GetAngle().VectorToObjectSpace(Vector)
    }

    public ToGlobal(Vector:Vector3) {
        return this.GetAngle().VectorToWorldSpace(Vector)
    }

    public GetMiddle() {
        return this.Position.add(this.Angle.UpVector.mul(this.Physics.Height * this.Physics.Scale))
    }
}