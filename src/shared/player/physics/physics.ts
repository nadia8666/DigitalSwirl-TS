import { Player } from "..";

export const PhysicsHandler = {
    // Acceleration
    AccelerateGrounded: (Player:Player) => {
        //TEMPORARY
        let Decel = .2
        let Acceleration = Player.Input.Stick.Magnitude > 0 && .1 || math.clamp(-Decel - ((Player.Speed.X) -Decel), -Decel, 0)

        Player.Speed = Player.Speed.add(new Vector3(Acceleration, 0, 0))
        Player.Speed = Player.Speed.mul(new Vector3(1, 1, .25))

        print(Player.Speed)
    },
    AccelerateAirborne: (Player:Player) => {

    },

    // Gravity
    ApplyGravity: (Player:Player) => {
        Player.Speed
        //Gravity
        const weight = Player.Physics.Weight // TODO: water weight
        let Acceleration = Player.ToLocal(Player.Flags.Gravity).mul(weight)
        
        //mplify gravity
        if (Player.Flags.Grounded /*&& self.spd.X > self.p.run_speed && self.dotp < 0*/) {
            Acceleration = Acceleration.mul(new Vector3(1, -8, 1))
        }
        
        //Air drag
        //if self.flag.ball_aura and self.dotp < 0.98 then
        //    Acceleration = vector.AddX(Acceleration, self.spd.X * -0.0002)
        //else
        //    Acceleration = vector.AddX(Acceleration, self.spd.X * self.p.air_resist)
        //end
        //Acceleration = vector.AddY(Acceleration, self.spd.Y * self.p.air_resist_y)
        //Acceleration = vector.AddZ(Acceleration, self.spd.Z * self.p.air_resist_z)
        
        //Apply acceleration
        Player.Speed = Player.Speed.add(Acceleration)
    },

    // Movement
    // TOOD: port https://github.com/SonicOnset/DigitalSwirl-Client/blob/master/ControlScript/Player/Movement.lua
    
    // Turning
    TurnRaw: (Player:Player, Turn:number) => {
        Player.Angle = Player.Angle.mul(CFrame.Angles(0, Turn, 0))
    },

    TurnDefault: (Player:Player, Turn:number) => {
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
        PhysicsHandler.TurnRaw(Player, math.clamp(Turn, -MaxTurn, MaxTurn))
    }
}