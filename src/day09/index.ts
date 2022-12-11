import run from "aocrunner"

type Pos = [number, number]
type Dir = "R" | "L" | "U" | "D"
type Line = Pos
type Input = Line[]

const parseInput = (rawInput: string): Input => {
  return rawInput
    .split("\n")
    .map((x) => [x.split(" ")[0] as Dir, Number(x.split(" ")[1])] as const)
    .flatMap(([d, n]) => {
      switch (d) {
        case "R":
          return new Array(n).fill([1, 0])
        case "L":
          return new Array(n).fill([-1, 0])
        case "U":
          return new Array(n).fill([0, 1])
        case "D":
          return new Array(n).fill([0, -1])
        default:
          throw new Error("parsing error")
      }
    })
}
const shouldMove = ([x1, y1]: Pos, [x2, y2]: Pos): boolean =>
  Math.abs(x1 - x2) > 1 || Math.abs(y1 - y2) > 1

const addPos = ([x1, y1]: Pos, [x2, y2]: Pos): Pos => [x1 + x2, y1 + y2]
const subPos = ([x1, y1]: Pos, [x2, y2]: Pos): Pos => [x1 - x2, y1 - y2]

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let H: Pos = [0, 0]
  let T: Pos = [0, 0]
  const TVisits = new Set<string>([String(T)])
  input.forEach((step) => {
    const nextH = addPos(H, step)
    if (shouldMove(T, nextH)) {
      // Tail always takes the previous head position
      // T = H.slice() as Pos
      // TVisits.add(String(T))

      const delta = subPos(nextH, T)
      if (delta[0] > 1) delta[0] -= 1
      if (delta[1] > 1) delta[1] -= 1
      if (delta[0] < -1) delta[0] += 1
      if (delta[1] < -1) delta[1] += 1

      T = addPos(T, delta)
      TVisits.add(String(T))
    }
    H = nextH
  })

  return TVisits.size
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let positions = new Array(10).fill(0).map<Pos>(() => [0, 0])
  const TVisits = new Set<string>([String(positions[positions.length - 1])])

  const move = (nextH: Pos, prevH: Pos, rope: Pos[]): Pos[] => {
    if (rope.length === 0) return rope
    if (!shouldMove(rope[0], nextH)) return rope

    // const nextT = prevH
    const delta = subPos(nextH, rope[0])
    if (delta[0] > 1) delta[0] -= 1
    if (delta[1] > 1) delta[1] -= 1
    if (delta[0] < -1) delta[0] += 1
    if (delta[1] < -1) delta[1] += 1

    const nextT = addPos(rope[0], delta)

    const prevT = rope[0]
    rope[0] = nextT

    if (rope.length === 1) {
      TVisits.add(String(rope[0]))
    }

    return [nextT, ...move(nextT, prevT, rope.slice(1))]
  }

  input.forEach((step) => {
    const nextH = addPos(positions[0], step)
    const prevH = positions[0]
    positions = [nextH, ...move(nextH, prevH, positions.slice(1))]
  })

  // if (testInput2 === rawInput) console.log(TVisits)

  return TVisits.size
}

const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`
const testInput2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

run({
  part1: {
    tests: [{ input: testInput, expected: 13 }],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput2,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
