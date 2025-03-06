import { StateMachine } from "./statemachine"
import { PlayerState } from "./states/states"

export class Player {
    public readonly State: StateMachine
    public Position: Vector3
    public Angle: CFrame

    constructor(Character: Model) {
        this.Position = Character.GetPivot().Position
        this.Angle = Character.GetPivot().Rotation
        this.State = new StateMachine(this)
        
        print(`Loaded new player ${Character}`)
    }

    public Destroy() {

    }

    public Update() {
        
        // Update state machine
        this.State.Update()
    }
}