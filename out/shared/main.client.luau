-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Player = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "player").Player
local LocalPlayer = game:GetService("Players").LocalPlayer
local PlayerObject = nil
local function CharacterAdded()
	local Character = LocalPlayer.Character
	assert(Character, "Character not found!")
	PlayerObject = Player.new(Character)
end
if LocalPlayer.Character then
	CharacterAdded()
end
LocalPlayer.CharacterAdded:Connect(CharacterAdded)
game:GetService("RunService"):BindToRenderStep("ControlScript_Update", Enum.RenderPriority.Input.Value - 1, function(DeltaTime) end)
