import run from "aocrunner"
import { getAdjecentLines, product } from "../utils/index.js"

type Line = number[]
type Input = Line[]

const parseInput = (rawInput: string): Input => {
  return rawInput.split("\n").map((x) => x.split("").map(Number))
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const result = input.flatMap((row, y) =>
    row.flatMap((n, x) =>
      getAdjecentLines(
        [x, y],
        [
          [0, 0],
          [input[0].length - 1, input.length - 1],
        ],
      ).some((line) => line.every(([x2, y2]) => input[y2][x2] < n)),
    ),
  )

  return result.filter(Boolean).length
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const result = input.flatMap((row, y) =>
    row
      .map((n, x) =>
        getAdjecentLines(
          [x, y],
          [
            [0, 0],
            [input[0].length - 1, input.length - 1],
          ],
        ).map((line) => {
          const d = line.findIndex(([x2, y2]) => input[y2][x2] >= n)
          if (d === -1) return line.length
          return d + 1
        }),
      )
      .map(product),
  )

  return result.slice().sort((a, b) => b - a)[0]
}

const testInput = `30373
25512
65332
33549
35390`

run({
  part1: {
    tests: [{ input: testInput, expected: 21 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testInput, expected: 8 }],
    solution: part2,
  },
  trimTestInputs: true,
})
