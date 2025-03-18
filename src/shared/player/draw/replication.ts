import { Players } from "@rbxts/services"
import Net, { Route } from "@rbxts/yetanothernet"
import * as Routes from "shared/common/replication/routes"

export class Peer {
    public Position:Vector3
    public Angle:CFrame

    constructor(InitialData:Routes.UpdateData) {
        this.Position = InitialData.Position
        this.Angle = InitialData.Angle
    }

    public Update(Data:Routes.UpdateData) {
        // TODO: find a better way to do this
        this.Position = Data.Position
        this.Angle = Data.Angle
    }

    public Destroy() {

    }
}

export class PlayerReplicator {
    public ReplicationRemote:Route<Routes.UpdateRoute>
    public Peers:Map<string,Peer>//Array<Peer>

    constructor() {
        this.ReplicationRemote = Routes.UpdateRoute
        this.Peers = new Map()
    }
    public ReplicateSelf() {

    }

    public ReplicateOthers() {
        for (const [Index, Sender, Data] of this.ReplicationRemote.query().from(Net.server)) {
            // update player info
            const TargetPeer = this.Peers.get(Data.Peer)
            
            if (TargetPeer === undefined) { continue }

            // update peer
            TargetPeer.Update(Data.Data)
        }
    }

    public AddPeer(Data:Routes.ConnectDisconnectPacket) {
        const TargetPlayer = Players.WaitForChild(Data.Peer, 15)

        if (TargetPlayer === undefined || !classIs(TargetPlayer, "Player")) { return }

        const NewPeer = new Peer({
            Angle:new CFrame(), // todo
            Position:new Vector3(), // todo
        })

        this.Peers.set(Data.Peer, NewPeer)
    }

    public RemovePeer(Data:Routes.ConnectDisconnectPacket) {
        const TargetPeer = this.Peers.get(Data.Peer)
        if (TargetPeer !== undefined) {
            TargetPeer.Destroy()
            this.Peers.delete(Data.Peer)
        } 
    }

    public Destroy() {
        this.Peers.forEach((Peer) => {
            Peer.Destroy()
        })

        this.Peers.clear()
    }
}