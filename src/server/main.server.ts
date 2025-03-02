import Net, { Route } from "@rbxts/yetanothernet"
import * as Routes from "shared/common/replication/routes"

const ReplicationRemote:Route<Routes.UpdatePacket> = Routes.UpdateRoute

game.GetService("RunService").Heartbeat.Connect(() => {
    for (const [Index, Sender, Packet] of ReplicationRemote.query()) {
        if (typeIs(Sender, "string")) { continue }

        const Players = game.GetService("Players").GetPlayers()

        Players.forEach((Player) => {
            if (Player !== Sender) {
                ReplicationRemote.send(Packet).to(Player)
            }
        })
    }
})