import { deepCopy as DeepCopy } from "@rbxts/deepcopy";
import { Player } from "..";
import { AnimationList, InferredAnimation } from "shared/characterinfo";

export class Animation {
    public Animations
    public Current:keyof AnimationList
    private Last:keyof AnimationList

    constructor(Player:Player) {
        Player.Physics
        const anims = Player.Animations

        this.Animations = DeepCopy(Player.Animations)
        this.Last = "Idle"
        this.Current = "Fall"

        this.LoadAnimations(Player)
    }

    public LoadAnimations(Player:Player) {
        const AnimationController:Animator = (Player.Character.WaitForChild("Humanoid").WaitForChild("Animator") as Animator) // TODO: make animct
        for (const [_, AnimationInfo] of pairs(this.Animations)) {
            for (const [Key, Value] of pairs(AnimationInfo)) {
                if (typeOf(Key) === "number") {
                    const NewInstance = new Instance("Animation")
                    NewInstance.AnimationId = `rbxassetid://${Value.id}`

                    Value.asset = AnimationController.LoadAnimation(NewInstance)
                }
            }
        }
    }

    public UnloadAnimations() {

    }

    public UpdateState(Animation: InferredAnimation, Playing:boolean) {
        for (const [Key, Value] of pairs(Animation)) {
            if (typeOf(Key) !== "number") { continue }
            Value.asset[Playing && "Play" || "Stop"]()
        }
    }

    public UpdateCurrent(Player:Player, Animation: InferredAnimation) {
        for (const [Key, Value] of pairs(Animation)) {
            if (typeOf(Key) !== "number") { continue }
            
            if (Value.pos !== undefined) {
                let Triggered = false

                const Next = Animation[Key + 1]
                if (Next && Next.pos) {
                    Triggered = Player.Speed.X >= Value.pos && Player.Speed.X < Next.pos
                } else {
                    Triggered = Player.Speed.X >= Value.pos
                }

                // TODO: implement :adjustspeed
                Value.asset.AdjustWeight(Triggered && .999 || .001)
            }
        }
    }

    public Animate(Player:Player) {
        const Previous = (this.Animations[this.Last] as InferredAnimation)
        const Next = (this.Animations[this.Current] as InferredAnimation)

        if (Previous !== Next) {
            this.UpdateState(Previous, false)
            this.UpdateState(Next, true)

            this.Last = this.Current
        }

        this.UpdateCurrent(Player, Next)
    }
}