import ReactRoblox from "@rbxts/react-roblox";
import { _UI_Debugger } from "shared/ui/debugging/debugger";
import { Players } from "@rbxts/services";

/**
 * @class
 */
export class UIMain {
    public Domain
    public Root
    public Debugger

    constructor() {
        this.Domain = new Instance("ScreenGui", Players.LocalPlayer.WaitForChild("PlayerGui"))
        this.Domain.Name = "Main"
        this.Domain.IgnoreGuiInset = true
        this.Domain.ResetOnSpawn = false

        this.Root = ReactRoblox.createRoot(this.Domain)

        this.Debugger = new _UI_Debugger()

        this.Root.render(this.Debugger.Root)

        print("Rendering ui")
    }
}