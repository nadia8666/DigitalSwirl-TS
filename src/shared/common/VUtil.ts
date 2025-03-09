export function Angle(from:Vector3, to:Vector3) {
    const dot = (from.Unit).Dot(to.Unit)
	if (dot >= 1) {
		return 0
    }
	else if (dot <= -1) {
        return -math.pi
    }
	return math.acos(dot)
}

export function Flatten(vector:Vector3, normal:Vector3) {
    const dot = vector.Dot(normal.Unit)
	return vector.sub((normal.Unit).mul(dot))
}