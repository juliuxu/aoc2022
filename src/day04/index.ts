import run from "aocrunner"
import { sum } from "../utils/index.js"

type SectionRange = [number, number]
type Line = [SectionRange, SectionRange]
type Input = Line[]

const parseInput = (rawInput: string): Input => {
  return rawInput
    .split("\n")
    .map((x) => x.split(",").map((y) => y.split("-").map(Number))) as Input
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return sum(
    input.map(([a, b]) => {
      if (a[0] >= b[0] && a[1] <= b[1]) return 1
      if (b[0] >= a[0] && b[1] <= a[1]) return 1
      return 0
    }),
  )
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return sum(
    input.map(([a, b]) => {
      if (a[0] >= b[0] && a[0] <= b[1]) return 1
      if (a[1] >= b[0] && a[1] <= b[1]) return 1

      if (b[0] >= a[0] && b[0] <= a[1]) return 1
      if (b[1] >= a[0] && b[1] <= a[1]) return 1

      return 0
    }),
  )
}

const testInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

run({
  part1: {
    tests: [{ input: testInput, expected: 2 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testInput, expected: 4 }],
    solution: part2,
  },
  trimTestInputs: true,
})
