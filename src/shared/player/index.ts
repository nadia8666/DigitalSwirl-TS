import { AddLog } from "shared/common/logger"
import { Camera } from "./draw/camera"
import { Renderer } from "./draw/renderer"
import { StateMachine } from "./statemachine"
import * as Render from "shared/common/renderregistry"
import { Input } from "./control/input"
import { CharacterInfo } from "shared/characterinfo"
import { UIMain } from "./ui"
import { Animation } from "./draw/animation"

export class DefaultFlags {
    public Grounded
    public LastUp
    
    public Floor:BasePart|undefined
    public FloorLast:CFrame|undefined
    public FloorOffset:CFrame|undefined
    public FloorSpeed
    public GroundRelative

    public BallEnabled
    public TrailEnabled

    public JumpTimer

    public Gravity:Vector3

    constructor() {
        this.Grounded = false
        this.LastUp = Vector3.yAxis

        this.Floor = undefined
        this.FloorLast = undefined
        this.FloorOffset = undefined
        this.FloorSpeed = Vector3.zero
        this.GroundRelative = -1

        this.BallEnabled = false
        this.TrailEnabled = false
        
        this.JumpTimer = 0

        this.Gravity = new Vector3(0, -1, 0)
    }
}

let PreviousAngle:CFrame|undefined

export class Player {
    // Main
    public Character: Model
    public Position: Vector3
    public Speed: Vector3
    public Angle: CFrame
    
    // Character info
    public Physics
    public Animations

    // Flags
    public Flags:DefaultFlags

    // Modules
    public readonly State: StateMachine
    public Camera: Camera
    public readonly Animation: Animation
    public Renderer: Renderer
    public Input: Input
    public UI: UIMain

    constructor(Character: Model) {
        this.Character = Character
        this.Position = Character.GetPivot().Position
        this.Angle = Character.GetPivot().Rotation
        this.Speed = Vector3.zero

        this.Physics = CharacterInfo.Physics
        this.Animations = CharacterInfo.Animations

        this.State = new StateMachine(this)
        this.Animation = new Animation(this)
        this.Camera = new Camera(this)
        this.Renderer = new Renderer(this)
        this.Input = new Input()
        this.UI = new UIMain()

        this.Flags = new DefaultFlags()

        Render.RegisterStepped("Player", Enum.RenderPriority.Input.Value + 1, () => this.Update())
        
        PreviousAngle = CFrame.identity

        AddLog(`Loaded new player ${Character}`)
    }

    public Destroy() {

    }

    public Update() {
        // Angle
        if (PreviousAngle !== this.Angle) {
            this.SetGroundRelative()
            PreviousAngle = this.Angle
        }

        // Update state machine
        this.State.Update()

        this.Renderer.Draw()
    }

    // Utility functions
    public GetAngle() {
        return this.Angle.add(this.Position)
    }

    public ToLocal(Vector:Vector3) {
        return (this.GetAngle().mul(CFrame.Angles(0, math.rad(90), 0))).VectorToObjectSpace(Vector)
    }

    public ToGlobal(Vector:Vector3) {
        return (this.GetAngle().mul(CFrame.Angles(0, math.rad(90), 0))).VectorToWorldSpace(Vector)
    }

    public GetMiddle() {
        return this.Position.add(this.Angle.UpVector.mul(this.Physics.Height * this.Physics.Scale))
    }

    public SetGroundRelative() {
        this.Flags.GroundRelative = this.Angle.UpVector.mul(-1).Dot(this.Flags.Gravity.Unit)
    }

    public EnterBall() {
        this.Flags.TrailEnabled = false
        this.Flags.BallEnabled = true
    }

    public ExitBall() {
        this.Flags.TrailEnabled = false
        this.Flags.BallEnabled = false
    }

    public Land() {
        this.ExitBall()
    }
}