export class Player {
    public Position: Vector3;
    public Angle: CFrame;


    constructor(Character: Model) {
        this.Position = Character.GetPivot().Position
        this.Angle = Character.GetPivot().Rotation

        print(`Loaded new player ${Character}`)
    }

    public Destroy() {

    }

    public Update() {

    }
}