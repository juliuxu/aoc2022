import run from "aocrunner"
import { sum } from "../utils/index.js"

type Line = 0 | number
type Input = Line[]

const parseInput = (rawInput: string): Input => {
  return rawInput.split("\n").flatMap((x) => {
    if (x === "noop") return 0
    else return [Number(x.split(" ")[1]), 0]
  })
}

const valueAt = (instructions: Input, n: number) =>
  1 + sum(instructions.slice(0, Math.max(n - 2, 0)))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return sum([20, 60, 100, 140, 180, 220].map((n) => valueAt(input, n) * n))
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let res = ``
  let cycle = 0
  for (let i = 0; i < 6; i += 1) {
    for (let k = 0; k < 40; k += 1) {
      cycle += 1
      const x = valueAt(input, cycle)
      // if (testInput === rawInput && cycle < 5) {
      //   console.log("valueAt", valueAt(input, 0))
      //   console.log(cycle, x)
      // }
      if (k >= x - 1 && k <= x + 1) {
        res += "#"
      } else {
        res += "."
      }
    }
    res += "\n"
  }

  return res
}

const testInput = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`

run({
  part1: {
    tests: [{ input: testInput, expected: 13140 }],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....
`,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
