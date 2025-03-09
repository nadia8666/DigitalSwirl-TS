import { Player } from "..";

export const PhysicsHandler = {
    // Acceleration
    AccelerateGrounded: (Player:Player) => {

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
    }

    // Movement
    // TOOD: port https://github.com/SonicOnset/DigitalSwirl-Client/blob/master/ControlScript/Player/Movement.lua
}