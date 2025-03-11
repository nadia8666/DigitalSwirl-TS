import { FrameworkState } from "shared/common/frameworkstate";
import { Player } from "..";
import * as VUtil from "shared/common/VUtil";
import * as CFUtil from "shared/common/CFUtil";

export const PhysicsHandler = {
    // Acceleration
    AccelerateGrounded: (Player:Player) => {
        const SpeedMultiplier = FrameworkState.SpeedMultiplier
    },
    AccelerateAirborne: (Player:Player) => {

    },

    // Gravity
    ApplyGravity: (Player:Player) => {
        const SpeedMultiplier = FrameworkState.SpeedMultiplier
        const weight = Player.Physics.Weight
        
        //Get cross product between our moving velocity and floor normal
        const FloorCrossSpeed = Player.Flags.LastUp.Cross(Player.ToGlobal(Player.Speed)) // TODO: replace with floor normal if needed
        let GravityAcceleration = Player.ToLocal(Player.Flags.Gravity.mul(weight))
        if (Player.Flags.GroundRelative < 0.875) {
            if (Player.Flags.GroundRelative >= 0.1 || math.abs(FloorCrossSpeed.Y) <= 0.6 || Player.Speed.X < 1.16) {
                if (Player.Flags.GroundRelative >= -0.4 || Player.Speed.X <= 1.16) {
                    if (Player.Flags.GroundRelative < -0.3 && Player.Speed.X > 1.16) {
                    
                    } else if (Player.Flags.GroundRelative < -0.1 && Player.Speed.X > 1.16) {

                    } else if (Player.Flags.GroundRelative < 0.5 && math.abs(Player.Speed.X) < Player.Physics.RunSpeed) {
                        GravityAcceleration = GravityAcceleration.mul(new Vector3(4.225, 1, 4.225))
                    } else if (Player.Flags.GroundRelative >= 0.7 || math.abs(Player.Speed.X) > Player.Physics.RunSpeed) {
                        if (Player.Flags.GroundRelative >= 0.87 || Player.Physics.JogSpeed <= math.abs(Player.Speed.X)) {
                            
                        } else {
                            GravityAcceleration = GravityAcceleration.mul(new Vector3(1, 1, 1.4))
                        }
                    } else {
                        GravityAcceleration = GravityAcceleration.mul(new Vector3(1, 1, 2))
                    }
                } else {

                }
            } else {
                GravityAcceleration = new Vector3(0, -weight, 0)
            }
        } else {
            GravityAcceleration = new Vector3(0, -weight, 0)
        }

        Player.Speed = Player.Speed.add(GravityAcceleration.mul(SpeedMultiplier))
    },

    // Movement
    // TOOD: port https://github.com/SonicOnset/DigitalSwirl-Client/blob/master/ControlScript/Player/Movement.lua
    
    AlignToGravity: (Player:Player) => {
        if (/*Player.Speed.magnitude < Player.p.dash_speed*/ true /*TODO: this*/) {
            //Remember previous speed
            const prev_spd = Player.ToGlobal(Player.Speed)
            
            //Get next angle
            const from = Player.Angle.UpVector
            const to = Player.Flags.Gravity.Unit.mul(-1)
            const turn = VUtil.Angle(from, to)
            
            if (turn !== 0) {
                const max_turn = math.rad(11.25)
                const lim_turn = math.clamp(turn, -max_turn, max_turn)
                
                const next_ang = CFUtil.FromToRotation(from, to).mul(Player.Angle)
                
                Player.Angle = (Player.Angle.Lerp(next_ang, lim_turn / turn))
            }
            
            //Keep using previous speed
            Player.Speed = Player.ToLocal(prev_spd)
        }
    },
    
    // Turning
    TurnRaw: (Player:Player, Turn:number) => {
        Player.Angle = Player.Angle.mul(CFrame.Angles(0, Turn, 0))
    },

    TurnDefault: (Player:Player, Turn:number) => {
        const SpeedMultiplier = FrameworkState.SpeedMultiplier

        let MaxTurn = math.abs(Turn)
	
        if (MaxTurn <= math.rad(45)) {
            if (MaxTurn <= math.rad(22.5)) {
                MaxTurn /= 8
            }else {
                MaxTurn /= 4
            }
        } else {
            MaxTurn = math.rad(11.25)
        }
        
        //Turn
        PhysicsHandler.TurnRaw(Player, math.clamp(Turn, -MaxTurn, MaxTurn) * SpeedMultiplier)
    }
}