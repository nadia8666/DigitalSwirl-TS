import { Route } from "@rbxts/yetanothernet"

export type UpdateData = {
    // list of player arguments to replicate
    Angle:CFrame,
    Position:Vector3,
}

export type UpdatePacket = [{
    Peer:string,

    Data:UpdateData
}]

export const UpdateRoute:Route<UpdatePacket> = new Route({
    Channel: "Reliable",
    Event: undefined,
})

//TODO: add incoming middleware to all packets