-- Compiled with roblox-ts v3.0.0
local Player
do
	Player = setmetatable({}, {
		__tostring = function()
			return "Player"
		end,
	})
	Player.__index = Player
	function Player.new(...)
		local self = setmetatable({}, Player)
		return self:constructor(...) or self
	end
	function Player:constructor(Character)
		self.Position = Character:GetPivot().Position
		self.Angle = Character:GetPivot().Rotation
		print(`Loaded new player {Character}`)
	end
	function Player:Destroy()
	end
	function Player:Update()
	end
end
return {
	Player = Player,
}
