import { StateAirborne } from "./airborne";
import { StateGrounded } from "./grounded";
import { StateNone } from "./none";

export type PlayerState = StateNone

export class StateList {
    private "Base" = new StateNone
    public "Airborne" = new StateAirborne
    public Grounded = new StateGrounded
}