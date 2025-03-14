import { FrameworkState } from "shared/common/frameworkstate";
import { Player } from "..";
import { GlobalReference } from "shared/common/globalreference";
import * as VUtil from "shared/common/VUtil"
import * as CFUtil from "shared/common/CFUtil"
import { Constants } from "shared/common/constants";

const CollisionReference = new GlobalReference("Workspace/Level/Map/Collision")

function GetAligned(Player:Player, Normal:Vector3) {
	if (Player.Angle.UpVector.Dot(Normal) < -0.999) {
        return CFrame.Angles(math.pi, 0, 0).mul(Player.Angle)
    }
	const Diff = CFUtil.FromToRotation(Player.Angle.UpVector, Normal)
	return Diff.mul(Player.Angle)
}

function AlignNormal(Player:Player, Normal:Vector3) {
	Player.Angle = GetAligned(Player, Normal)
}

//Velocity cancel for walls
function VelCancel(Velocity:Vector3, Normal:Vector3) {
	const Dot = Velocity.Dot(Normal.Unit)
	if (Dot < 0) {
        return Velocity.sub((Normal.Unit).mul(Dot))
    }
	return Velocity
}

function LocalVelCancel(Player:Player, vel:Vector3, normal:Vector3) {
	return Player.ToLocal(VelCancel(Player.ToGlobal(vel), normal.Unit))
}

function LocalFlatten(Player:Player, vector:Vector3, normal:Vector3) {
	return Player.ToLocal(VUtil.Flatten(Player.ToGlobal(vector), normal.Unit))
}

function Raycast(Whitelist:Instance[], From:Vector3, Direction:Vector3) {
    const Params = new RaycastParams
	Params.FilterType = Enum.RaycastFilterType.Include
	Params.FilterDescendantsInstances = Whitelist
	Params.IgnoreWater = true
	const Result = game.Workspace.Raycast(From, Direction, Params)
	if (Result) {
		return $tuple(Result.Instance, Result.Position, Result.Normal, Result.Material)
    } else { return $tuple(undefined, From.add(Direction), undefined, Enum.Material.Air) }
}

//Wall collision
function WallRay(Player:Player, Whitelist:Instance[], Y:number, Direction:Vector3, Velocity:number) {
	//Raycast
	const ReverseDirection = Direction.mul(Player.Physics.Radius * Player.Physics.Scale)
	const From = Player.Position.add(Player.Angle.UpVector.mul(Y))
	const ForwardDirection = Direction.mul(Player.Physics.Radius + Velocity).mul(Player.Physics.Scale)
	
	const Result = Raycast(Whitelist, From, ForwardDirection)
	const Hit = Result[0]
    const Position = Result[1]
    const Normal = Result[2]

	if (Hit) {
        return $tuple((Position?.sub(ReverseDirection))?.sub(From), Normal, Position)
    }

	return $tuple(undefined, undefined, undefined)
}

function CheckWallAttach(Player:Player, Direction:Vector3, Normal:Vector3) {
	const DirectionDot = Direction.Dot(Normal)
	const SpeedDot = Player.ToGlobal(Player.Speed).Dot(Normal)
	const UpDot = Player.Angle.UpVector.Dot(Normal)
	return (DirectionDot < -0.35 && SpeedDot < -1.16 && UpDot > 0.5)
}

function WallAttach(Player:Player, Whitelist:Instance[], InputNormal:Vector3) {
	const FUp = Player.Physics.Height * Player.Physics.Scale
	const FDown = FUp + (Player.Physics.PositionError * Player.Physics.Scale)
	const Result = Raycast(Whitelist, Player.Position.add(Player.Angle.UpVector.mul(FUp)), InputNormal.mul(-FDown))
	const Hit = Result[0]
    const Normal = Result[1]
    const Position = Result[2]

    if (Hit && Position) {
        Player.Position = Position
		Player.Angle = GetAligned(Player, Normal)
    }
}

function WallHit(Player:Player, Normal:Vector3) {
	Player.Speed = LocalVelCancel(Player, Player.Speed, Normal)
}

function WallCollide(Player:Player, Whitelist:Instance[], Y:number, Direction:Vector3, Velocity:number, ForwardAttach:boolean, BackAttach:boolean) {
	//Positive and negative wall collision
    const Result1 = WallRay(Player, Whitelist, Y, Direction, math.max(Velocity, 0))
    const Result2 = WallRay(Player, Whitelist, Y, Direction.mul(-1), math.max(-Velocity, 0))
    
    let ForwardPos = Result1[0]
    let ForwardNormal = Result1[1]

    let BackwardPos = Result2[0]
    let BackwardNormal = Result2[1]
	
	//Clip with walls
	let ShouldMove = true
	if (ForwardPos && BackwardPos && ForwardNormal && BackwardNormal) {
        Player.Position = Player.Position.add((ForwardPos.add(BackwardPos)).div(2))
		const Middle = ForwardNormal.add(BackwardNormal)
		if (Middle.Magnitude !== 0) {
            ForwardNormal = Middle.Unit
        } else {
            ForwardNormal = undefined
        }
		BackwardNormal = undefined
		ShouldMove = false
    } else if (ForwardPos) {
        Player.Position = Player.Position.add(ForwardPos)
    } else if (BackwardPos) {
        Player.Position = Player.Position.add(BackwardPos)
    }
	
	//Velocity cancelling
	if (ForwardNormal) {
		if (ForwardAttach && CheckWallAttach(Player, Direction, ForwardNormal)) {
			WallAttach(Player, Whitelist, ForwardNormal)
			ShouldMove = false
        } else {
			WallHit(Player, ForwardNormal)
        }
    }
	if (BackwardNormal) {
		if (BackAttach && CheckWallAttach(Player, Direction.mul(-1), BackwardNormal)) {
			WallAttach(Player, Whitelist, BackwardNormal)
			ShouldMove = false
        } else {
			WallHit(Player, BackwardNormal)
        }
    }
	return ShouldMove
}

export function RunCollision(Player:Player) {
    const SpeedMultiplier = FrameworkState.SpeedMultiplier

    //Remember previous state
	const PreviousSpeed = Player.ToGlobal(Player.Speed)
	
	//Get collision whitelist
	const CollisionWhitelist = [CollisionReference.Get()]
	
	//Stick to moving floors
    if (Player.Flags.Grounded && Player.Flags.Floor && Player.Flags.FloorLast && Player.Flags.FloorOffset) {
        const PreviousWorld = Player.Flags.FloorLast.mul(Player.Flags.FloorOffset)
        const NewWorld = Player.Flags.Floor.CFrame.mul(Player.Flags.FloorOffset)
        const RightDiff = CFUtil.FromToRotation(PreviousWorld.RightVector, NewWorld.RightVector)
        const UpDiff = CFUtil.FromToRotation(PreviousWorld.UpVector, NewWorld.UpVector)
        Player.Flags.FloorSpeed = NewWorld.Position.sub(PreviousWorld.Position)
        Player.Position = Player.Position.add(Player.Flags.FloorSpeed)
        Player.Angle = RightDiff.mul(Player.Angle)
    }
	
	for (const i of $range(1, 4)) {
		//Remember previous position
		const PreviousPosition = Player.Position
		const PreviousMiddle = Player.GetMiddle()
		
        //Wall collision heights
		const HeightScale = 1
		const Heights = [
			Player.Physics.Height * 0.85 * Player.Physics.Scale * HeightScale,
			Player.Physics.Height * 1.25 * Player.Physics.Scale * HeightScale,
			Player.Physics.Height * 1.95 * Player.Physics.Scale * HeightScale,
        ]

        //Wall collision and horizontal movement
        {
            let XMove = true
            let ZMove = true
            for (const [i,v] of pairs(Heights)) {
                if( WallCollide(Player, CollisionWhitelist, v, Player.Angle.LookVector, Player.Speed.X * SpeedMultiplier, (Player.Flags.Grounded || (Player.Speed.Y <= 0)) && (i === 1), false) === false) {
                    XMove = false
                }
                if (WallCollide(Player, CollisionWhitelist, v, Player.Angle.RightVector, Player.Speed.Z * SpeedMultiplier, false, false) === false) {
                    ZMove = false
                }
            }

            if (XMove) {
                Player.Position = Player.Position.add(Player.Angle.LookVector.mul(Player.Speed.X * SpeedMultiplier * Player.Physics.Scale))
            }
            if (ZMove) {
                Player.Position = Player.Position.add(Player.Angle.RightVector.mul(Player.Speed.Z * SpeedMultiplier * Player.Physics.Scale))
            }
        }

		//Ceiling collision
        {
            let CeilUp = Player.Physics.Height * Player.Physics.Scale
            let CeilDown = CeilUp
            
            if (Player.Speed.Y > 0) {
                CeilDown += Player.Speed.Y * SpeedMultiplier * Player.Physics.Scale //Moving upwards, extend raycast upwards
            } else if (Player.Speed.Y < 0) {
                CeilUp += Player.Speed.Y * SpeedMultiplier * Player.Physics.Scale //Moving downwards, move raycast downwards
            }
            
            const From = Player.Position.add(Player.Angle.UpVector.mul(CeilUp))
            const Direction = Player.Angle.UpVector.mul(CeilDown)
            const Result = Raycast(CollisionWhitelist, From, Direction)
            const Hit = Result[0]
            const Position = Result[1]
            const Normal = Result[2]
            
            if (Hit && Position && Normal) {
                if (Player.Flags.Grounded) {
                    //Set ceiling clip flag
                    //Player.flag.ceiling_clip = nor:Dot(Player.gravity.Unit) > 0.9 // TODO: ceil clip
                } else {
                    //Clip and cancel velocity
                    Player.Position = Position.sub((Player.Angle.UpVector.mul((Player.Physics.Height * 2 * Player.Physics.Scale))))
                    Player.Speed = LocalVelCancel(Player, Player.Speed, Normal)
                    //Player.flag.ceiling_clip = false
                }
            }
        }
		
		//Floor collision
        {
            let PositionError = Player.Flags.Grounded && (Player.Physics.PositionError * Player.Physics.Scale) || 0
            let FloorUp = Player.Physics.Height * Player.Physics.Scale
            let FloorDown = -(FloorUp + PositionError)
            print(FloorDown)
            
            if (Player.Speed.Y < 0) {
                FloorDown += Player.Speed.Y * SpeedMultiplier * Player.Physics.Scale //Moving downwards, extend raycast downwards
            } else if (Player.Speed.Y > 0) {
                FloorUp += Player.Speed.Y * Player.Physics.Scale //Moving upwards, move raycast upwards
                FloorDown = Player.Speed.Y - .1
            }

            
            const From = Player.Position.add(Player.Angle.UpVector.mul(FloorUp))
            const Direction = Player.Angle.UpVector.mul(FloorDown)
            const _ = Raycast(CollisionWhitelist, From, Direction)
            let Hit = _[0], Position = _[1], Normal = _[2]
            
            //Do additional collision checks
            if (Hit && Position && Normal) {
                let DropOff = false
                
                if (Hit.FindFirstChild("NoFloor")) {
                    //Floor cannot be stood on under any conditions
                    DropOff = true
                } else if (Player.Flags.Grounded) {
                    //Don't stay on the floor if we're going too slow on a steep floor
                    if (Player.Angle.UpVector.Dot(Normal) < 0.3) {
                        DropOff = true
                    } else if (Normal.Dot(Player.Flags.Gravity.Unit.mul(-1)) < 0.4) {
                        if (((Player.Speed.X ^ 2) + (Player.Speed.Z ^ 2)) < (1.16 ^ 2)) {
                            DropOff = true
                        }
                    }
                } else {//Don't collide with the floor if we won't land at a speed fast enough to stay on it
                    const NextSpeed = VUtil.Flatten(Player.ToGlobal(Player.Speed), Normal)
                    const NextAng = GetAligned(Player, Normal)
                    const NextLocalSpeed = (NextAng.Inverse().mul(NextSpeed)).mul(new Vector3(1, 0, 1))

                    if (Normal.Dot(Player.Flags.Gravity.Unit.mul(-1)) < 0.4) {
                        if (NextLocalSpeed.Magnitude < 1.16) {
                            DropOff = true
                        }
                    }
                }
                
                
                //Do simple collision
                if (DropOff) {
                    Player.Speed = LocalVelCancel(Player, Player.Speed, Normal)
                    Player.Position = Position
                    Hit = undefined
                }
            }
            
            //Do standard floor collision
            if (Hit && Position && Normal) {
                //Snap to ground
                Player.Position = Position
                Player.Flags.Floor = Hit
                
                //Align with ground
                if (!Player.Flags.Grounded) {
                    Player.Speed = VUtil.Flatten(Player.ToGlobal(Player.Speed), Normal)
                    
                    Player.Flags.Grounded = true
                    AlignNormal(Player, Normal)
                    
                    Player.Speed = Player.ToLocal(Player.Speed)
                } else {
                    Player.Flags.Grounded = true
                    AlignNormal(Player, Normal)
                }
                
                //Kill any lingering vertical speed
                Player.Speed = Player.Speed.mul(new Vector3(1, 0, 1))
            } else {
                //Move vertically and unground
                Player.Position = Player.Position.add(Player.Angle.UpVector.mul(Player.Speed.Y * SpeedMultiplier * Player.Physics.Scale))
                Player.Flags.Grounded = false
                Player.Flags.Floor = undefined
            }
        }
		
		//Check if we clipped through something from our previous position to our new position
		{
            const NewMiddle = Player.GetMiddle()
            if (NewMiddle !== PreviousMiddle) {
                const NewAdd = NewMiddle.sub(PreviousMiddle).Unit.mul((Player.Physics.Radius * Player.Physics.Scale))
                const NewEnd = NewMiddle// + new_add
                const Result = Raycast(CollisionWhitelist, PreviousMiddle, NewEnd.sub(PreviousMiddle))
                const Hit = Result[0]
                const Position = Result[1]
                const Normal = Result[2]
                if (Hit && Position && Normal) {
                    //Clip us out
                    print("clip")
                    Player.Position = Player.Position.add((Position.sub(NewAdd)).sub(NewMiddle))
                    Player.Speed = LocalVelCancel(Player, Player.Speed.mul(.8), Normal) // TODO: see if you can do without?
                }
                else {
                    break
                }
            } else {
                break
            }
        }
    }
	
	//Check if we're submerged in water
	//Player.flag.underwater = PointInWater(Player.pos + Player.GetUp() * (Player.Physics.height * Player.Physics.scale)) // TODO: water
	
	//Handle floor positioning
	if (Player.Flags.Gravity && Player.Flags.Floor) {
        Player.Flags.FloorOffset = Player.Flags.Floor.CFrame.Inverse().mul((Player.Angle.add(Player.Position)))
		Player.Flags.FloorLast = Player.Flags.Floor.CFrame
		if (!Player.Flags.FloorSpeed) {
            Player.Flags.FloorSpeed = Player.Flags.Floor.AssemblyLinearVelocity.div(Constants.Tickrate)
        }
    } else {
        Player.Flags.Floor = undefined
		Player.Flags.FloorOffset = CFrame.identity
		Player.Flags.FloorLast = undefined

        Player.Speed = Player.Speed.add(Player.ToLocal(Player.Flags.FloorSpeed).div(Player.Physics.Scale))

		Player.Flags.FloorSpeed = Vector3.zero
    }
}