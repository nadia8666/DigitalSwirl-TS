/**
 * @class
 */
export class ButtonState {
    public Pressed
    public Activated
    public CanBeUpdated
    private LastActivated
    public KeyCodes: Enum.KeyCode[]

    constructor() {
        this.Pressed = false
        this.Activated = false
        this.LastActivated = false
        this.CanBeUpdated = true
        this.KeyCodes = []
    }

    /**
     * Updaet button state
     * @param Activated 
     */
    public Update(Activated:boolean) {
        if (!this.CanBeUpdated) { return }

        // Register input for lower game speed
        if (Activated) { this.CanBeUpdated = false }

        this.Activated = Activated
        
        if (!this.LastActivated && this.Activated) { 
            this.Pressed = true
        } else if (this.Pressed) {
            this.Pressed = false
        }

        this.LastActivated = this.Activated
    }
}
