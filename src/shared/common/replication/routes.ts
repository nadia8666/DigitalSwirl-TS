import { Route } from "@rbxts/yetanothernet"

// UPDATE
export type UpdateData = {
    // list of player arguments to replicate
    Angle:CFrame,
    Position:Vector3,
}

export type UpdatePacket = {
    Peer:string,

    Data:UpdateData
}

export type UpdateRoute = [UpdatePacket]

export const UpdateRoute:Route<UpdateRoute> = new Route({
    Channel: "Reliable",
    Event: undefined,
})

// CONNECT DISCONNECT
export type ConnectDisconnectPacket = {
    Peer:string,
}

export type ConnectDisconnectRoute = [ConnectDisconnectPacket]

export const ConnectDisconnectRoute:Route<ConnectDisconnectRoute> = new Route({
    Channel: "Reliable",
    Event: undefined,
})

//TODO: add incoming middleware to all packets