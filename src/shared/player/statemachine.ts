import { Constants } from "shared/common/constants"
import { Player } from "."

import { AddLog } from "shared/common/logger";
import { PlayerState, StateList } from "./states/states";

export type StatesUnion = ExtractKeys<StateList, PlayerState>
export type StatesList = Map<StatesUnion, PlayerState>

const MainMap = new Map<StatesUnion, PlayerState>
for (const [Key, State] of pairs(new StateList)) {
    const Index = identity<StatesUnion>(Key)

    MainMap.set(Index, State)
}

/**
 * State machine
 * @class
 */
export class StateMachine {
    private Player: Player
    private NextTick: number
    public List: StatesList
    public Current: PlayerState

    constructor(Player:Player) {
        this.List = new Map()

        MainMap.forEach((Value, Index) => {
            this.List.set(Index, Value)
        })

        this.NextTick = os.clock()
        this.Player = Player
        this.Current = this.Get("Airborne")
    };

    /**
     * Internal method for ticking the current state
     */
    private TickState() {
        this.Current.CheckMoves(this.Player)

        this.Current.Tick(this.Player)
    };
    
    /**
     * Update the state machine, **only run this if you know what you're doing!**
     */
    public Update() {
        // Generic fixed update loop
        while (os.clock() > this.NextTick) {
            this.TickState()

            this.NextTick += 1/Constants.Tickrate
        }
    };

    /**
     * 
     * @param Index State to change to
     * @returns Found PlayerState
     * @throws If invalid state is searched for
     */
    public Get(Index: StatesUnion):PlayerState {
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