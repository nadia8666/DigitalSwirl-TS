import { Player } from "..";

// State base type
export interface StateNone {
    GetPlayer() : Player
    CheckInput() : undefined
    Update() : undefined
}