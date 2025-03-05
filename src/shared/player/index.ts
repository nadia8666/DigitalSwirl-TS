import { StateMachine, PlayerState } from "./statemachine"

export class Player {
    public readonly States: StateMachine
    public Position: Vector3
    public Angle: CFrame
    public State: PlayerState

    constructor(Character: Model) {
        this.Position = Character.GetPivot().Position
        this.Angle = Character.GetPivot().Rotation
        this.States = new StateMachine(this)
        this.State = this.States.Get("Grounded")

        print(`Loaded new player ${Character}`)
    }

    public Destroy() {

    }

    public Update() {
        
        // Update state machine
        this.States.Update()
    }
}