import { FrameworkState } from "shared/common/frameworkstate";
import { Player } from "..";
import * as VUtil from "shared/common/VUtil";
import * as CFUtil from "shared/common/CFUtil";

declare function unpack<T>(arr: Array<T>): T

export const PhysicsHandler = {
    // Acceleration
    AccelerateGrounded: (Player:Player) => {
        const SpeedMultiplier = FrameworkState.SpeedMultiplier

        const MaxXSoeed = Player.Physics.MaxXSpeed
        const RunAcceleration = Player.Physics.RunAcceleration
        const Friction = /*self.flag.grounded and self.frict_mult*/ 1 || 1

        //Get analogue state
        let Acceleration = new Vector3(0,0,0)
        let MovementAcceleration = 0
        let _ = Player.Input.Get(Player)
        const HasControl = _[0], Turn = _[1], Magnitude = _[2] // TODO: implement this for all $tuples
        
        //X air drag
        // TODO: see if i can improve
        if (HasControl) {
            if (Player.Speed.X <= MaxXSoeed || Player.Flags.GroundRelative <= 0.96) {
                if (Player.Speed.X > MaxXSoeed) {
                    Acceleration = Acceleration.add(new Vector3((Player.Speed.X - MaxXSoeed) * Player.Physics.AirResist.X, 0, 0))
                } else if (Player.Speed.X < 0) {
                    Acceleration = Acceleration.add(new Vector3(Player.Speed.X * Player.Physics.AirResist.X, 0, 0))
                }
            } else {
                Acceleration = Acceleration.add(new Vector3((Player.Speed.X - MaxXSoeed) * (Player.Physics.AirResist.X * 1.7), 0, 0))
            }
        } else {
            if (Player.Speed.X > Player.Physics.RunSpeed) {
                Acceleration = Acceleration.add(new Vector3(Player.Speed.X * Player.Physics.AirResist.X))
            } else if (Player.Speed.X > MaxXSoeed) {
                Acceleration = Acceleration.add(new Vector3((Player.Speed.X - MaxXSoeed) * Player.Physics.AirResist.X))
            } else if (Player.Speed.X < 0) {
                Acceleration = Acceleration.add(new Vector3(Player.Speed.X * Player.Physics.AirResist.X))
            }
        }
        
        //Y and Z air drag
        Player.Speed = Player.Speed.add(Player.Speed.mul(new Vector3(0, Player.Physics.AirResist.Y, Player.Physics.AirResist.Z)))
        
        //Movement
        if (HasControl) {
            //Get acceleration
            if (Player.Speed.X >= MaxXSoeed) {
                //Use lower acceleration if above max speed
                if (Player.Speed.X < MaxXSoeed || Player.Flags.GroundRelative >= 0) {
                    MovementAcceleration = RunAcceleration * Magnitude * 0.4
                } else {
                    MovementAcceleration = RunAcceleration * Magnitude
                }
            } else {
                //Get acceleration, stopping at intervals based on analogue stick magnitude
                MovementAcceleration = 0
                
                if (Player.Speed.X >= Player.Physics.JogSpeed) {
                    if (Player.Speed.X >= Player.Physics.RunSpeed) {
                        if (Magnitude <= 0.9) {
                            MovementAcceleration = RunAcceleration * Magnitude * 0.3
                        } else {
                            MovementAcceleration = RunAcceleration * Magnitude
                        }
                    } else if (Magnitude <= 0.7) {
                        if (Player.Speed.X < Player.Physics.RunSpeed) {
                            MovementAcceleration = RunAcceleration * Magnitude
                        }
                    } else {
                        MovementAcceleration = RunAcceleration * Magnitude
                    }
                } else if (Magnitude <= 0.5) {
                    if (Player.Speed.X < (Player.Physics.JogSpeed + Player.Physics.RunSpeed) * 0.5) {
                        MovementAcceleration = RunAcceleration * Magnitude
                    }
                } else {
                    MovementAcceleration = RunAcceleration * Magnitude
                }
            }
            
            //Turning
            const AbsoluteTurn = math.abs(Turn)
            if (math.abs(Player.Speed.X) < 0.001 && AbsoluteTurn > math.rad(22.5)) {
                MovementAcceleration = 0
                //self:AdjustAngleYQ(analogue_turn)
            } else {
                if (Player.Speed.X < (Player.Physics.JogSpeed + Player.Physics.RunSpeed) * 0.5 || AbsoluteTurn <= math.rad(22.5)) {
                    if (Player.Speed.X < Player.Physics.JogSpeed || AbsoluteTurn >= math.rad(22.5)) {
                        if (Player.Speed.X < Player.Physics.DashSpeed || !Player.Flags.Grounded) {
                            if (Player.Speed.X >= Player.Physics.JogSpeed && Player.Speed.X <= Player.Physics.RushSpeed && AbsoluteTurn > math.rad(45)) {
                                MovementAcceleration *= 0.8
                            }
                            //self:AdjustAngleY(analogue_turn)
                        } else {
                            //self:AdjustAngleYS(analogue_turn)
                        }
                    } else {
                        //self:AdjustAngleYS(analogue_turn)
                    }
                } else {
                    MovementAcceleration = Player.Physics.StandardDeceleration / Friction
                    //self:AdjustAngleY(analogue_turn)
                }
            }
        } else { 
            //Decelerate
            MovementAcceleration = PhysicsHandler.GetDecel(Player.Speed.X + Acceleration.X, Player.Physics.StandardDeceleration)
        }
        
        //Apply movement acceleration
        Acceleration = Acceleration.add(new Vector3(MovementAcceleration * Friction, 0, 0))

        //Apply acceleration
        Player.Speed = Player.Speed.add(Acceleration)
    },
    AccelerateAirborne: (Player:Player) => {
        PhysicsHandler.AccelerateGrounded(Player)

        if /*(self.rail_trick > 0) ||*/ (Player.Flags.JumpTimer > 0 && Player.Flags.BallEnabled && Player.Input.Button.Jump.Activated) {
            Player.Flags.JumpTimer -= 1
            Player.Speed = Player.Speed.add(new Vector3(0, Player.Physics.JumpHoldForce * 0.8 /* * (1 + self.rail_trick / 2)*/, 0))
        }
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
    },

    GetDecel(Speed:number, Deceleration:number) {
        if (Speed > 0) {
            return -math.min(Speed, -Deceleration)
        } else if (Speed < 0) {
            return math.min(-Speed, -Deceleration)
        }
        return 0
    }
}