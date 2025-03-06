import { AddLog } from "./logger"

export const List = new Map<string, Callback>

export function RegisterStepped(Name:string, Value:number, Callback:Callback) {
    if (List.get(Name)) {
        UnregisterStepped(Name)

        AddLog(`Overwriting previous register for ${Name}, was this registered twice?`)
    }

    List.set(Name, Callback)
    game.GetService("RunService").BindToRenderStep(Name, Value, Callback)
}

export function UnregisterStepped(Name:string) { 
    List.delete(Name)
    game.GetService("RunService").UnbindFromRenderStep(Name)
}

export function UnregisterAll() {
    List.forEach((_, Key) => {
        UnregisterStepped(Key)
    })
}