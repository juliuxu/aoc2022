import run from "aocrunner"
import { chunked, intersect, sum } from "../utils/index.js"

type Comp = string
type Line = [Comp, Comp]
type Input = Line[]

const parseInput = (rawInput: string): Input => {
  return rawInput
    .split("\n")
    .map((x) => [x.slice(0, x.length / 2), x.slice(x.length / 2)])
}

const priority = (char: string) => {
  const charCode = char.charCodeAt(0)
  if (charCode < 97) return charCode - 65 + 27
  return charCode - 97 + 1
}
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return sum(
    input
      .map((x) => [...intersect(...x)])
      .map((x) => x.map(priority))
      .map(sum),
  )
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const sections = chunked(input, 3).map((x) => x.map((y) => y.join("")))

  return sum(
    sections.map((section) =>
      sum(
        [...section.reduce((acc, x) => intersect(acc, x))].map((x) =>
          priority(x),
        ),
      ),
    ),
  )
}

const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

run({
  part1: {
    tests: [{ input: testInput, expected: 157 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testInput, expected: 70 }],
    solution: part2,
  },
  trimTestInputs: true,
})
