import run from "aocrunner"
import { sum } from "../utils/index.js"

type Line = number[]
type Input = Line[]

const parseInput = (rawInput: string): Input => {
  return rawInput.split("\n\n").map((x) => x.split("\n").map(Number))
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return Math.max(...input.map(sum))
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const topThree = input
    .map(sum)
    .sort((a, b) => b - a)
    .slice(0, 3)
  return sum(topThree)
}

const testInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

run({
  part1: {
    tests: [{ input: testInput, expected: 24000 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testInput, expected: 45000 }],
    solution: part2,
  },
  trimTestInputs: true,
})
