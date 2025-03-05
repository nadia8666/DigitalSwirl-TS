import { Constants } from "shared/common/constants"
import { Player } from "."

import { StateNone } from "./states/none";
import { StateGrounded } from "./states/grounded";
import { StateAirborne } from "./states/airborne";
import { AddLog } from "shared/common/logger";

export type States = "Grounded"|"Airborne"
export type StateMap = Map<States, StateNone>
export type PlayerState = StateNone

export class StateMachine {
    private Player: Player
    private NextTick:number
    public List:StateMap

    constructor(Player:Player) {
        this.List = new Map()
        this.List.set("Airborne", new StateAirborne(Player))
        this.List.set("Grounded", new StateGrounded(Player))

        this.NextTick = os.clock()
        this.Player = Player
    };

    private TickState() {
        const PreviousState = this.Player.State
        let CurrentState = this.Player.State

        CurrentState.CheckInput()

        if (PreviousState !== this.Player.State) {
            CurrentState = this.Player.State
        }

        CurrentState.Update()
    };

    public Update() {
        // generic fixed update loop
        while (os.clock() > this.NextTick) {
            this.TickState()

            this.NextTick += 1/Constants.Tickrate
        }
    };

    public Get(Index: States):StateNone {
        const Pick = this.List.get(Index)

        if (Pick !== undefined) {
            return Pick
        } else {
            const LogText = `Attempted to get valid state, state not found? ${Index}`
            AddLog(LogText)
            error(LogText)
        }
    }
}