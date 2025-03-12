export function MergeProperties(Prop1:{}, Prop2:{}){
    let FinalTable = new Map()

    for (const [Key, Value] of pairs(Prop1)) {
        FinalTable.set(Key, Value)
    }

    for (const [Key, Value] of pairs(Prop2)) {
        FinalTable.set(Key, Value)
    }

    return FinalTable
}