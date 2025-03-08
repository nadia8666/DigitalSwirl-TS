export class ButtonState {
    public Pressed
    public Activated
    private LastActivated
    public KeyCodes: Enum.KeyCode[]

    constructor() {
        this.Pressed = false
        this.Activated = false
        this.LastActivated = false
        this.KeyCodes = []
    }

    public Update(Activated:boolean) {
        this.Activated = Activated

        if (!this.LastActivated && this.Activated) { 
            this.Pressed = true
        } else if (this.Pressed) {
            this.Pressed = false
        }

        this.LastActivated = this.Activated
    }
}