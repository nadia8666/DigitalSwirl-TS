-- Compiled with roblox-ts v3.0.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Routes = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "common", "replication", "routes")
local ReplicationRemote = Routes.UpdateRoute
game:GetService("RunService").Heartbeat:Connect(function()
	for Index, Sender, Packet in ReplicationRemote:query() do
		if type(Sender) == "string" then
			continue
		end
		local Players = game:GetService("Players"):GetPlayers()
		-- ▼ ReadonlyArray.forEach ▼
		local _callback = function(Player)
			if Player ~= Sender then
				ReplicationRemote:send(Packet):to(Player)
			end
		end
		for _k, _v in Players do
			_callback(_v, _k - 1, Players)
		end
		-- ▲ ReadonlyArray.forEach ▲
	end
end)
