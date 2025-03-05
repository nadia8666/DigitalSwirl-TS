type Log = Array<string>;

const LogTable: Map<number, Log> = new Map();

export function AddLog(Value:unknown) {
    let Export = tostring(Value)

    if (typeOf(Export) !== "string") { return }

    const Tick = os.clock();
    const Original:Log|undefined = LogTable.get(Tick);

    if (Original !== undefined) {
		// Insert new log for current registered tick
        Original.push(Export)

    	LogTable.set(Tick, Original);
    } else {
    	// Register new log for tick
        let NewValue:Array<string> = new Array();
        NewValue.push(Export)

    	LogTable.set(Tick, NewValue);
    }
}

export function WipeLog() {
	LogTable.clear();
}
