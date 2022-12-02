import run from "aocrunner"
import { sum } from "../utils/index.js"

enum Hand {
  Rock = "A",
  Paper = "B",
  Scissor = "C",
}

enum Strat {
  X = "X",
  Y = "Y",
  Z = "Z",
}

type Line = [Hand, Strat]
type Input = Line[]

const parseInput = (rawInput: string): Input => {
  return rawInput.split("\n").map((x) => x.split(" ") as Line)
}

const shapeScore = {
  [Hand.Rock]: 1,
  [Hand.Paper]: 2,
  [Hand.Scissor]: 3,
}
const gameScore = (left: Hand, right: Hand) => {
  if (left === right) return 3
  if (left === Hand.Rock && right === Hand.Paper) return 6
  if (left === Hand.Paper && right === Hand.Scissor) return 6
  if (left === Hand.Scissor && right === Hand.Rock) return 6
  return 0
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const stratMap = {
    [Strat.X]: Hand.Rock,
    [Strat.Y]: Hand.Paper,
    [Strat.Z]: Hand.Scissor,
  }

  return sum(
    input.map(([left, sRight]) => {
      const right = stratMap[sRight]
      return shapeScore[right] + gameScore(left, right)
    }),
  )
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const stratMap = (left: Hand, right: Strat) => {
    const winMap = {
      [Hand.Rock]: Hand.Paper,
      [Hand.Paper]: Hand.Scissor,
      [Hand.Scissor]: Hand.Rock,
    }
    const loseMap = {
      [Hand.Rock]: Hand.Scissor,
      [Hand.Paper]: Hand.Rock,
      [Hand.Scissor]: Hand.Paper,
    }
    if (right === Strat.X) return loseMap[left]
    if (right === Strat.Y) return left
    if (right === Strat.Z) return winMap[left]
    throw new Error("unreachable")
  }

  return sum(
    input.map(([left, sRight]) => {
      const right = stratMap(left, sRight)
      return shapeScore[right] + gameScore(left, right)
    }),
  )
}

const testInput = `A Y
B X
C Z`

run({
  part1: {
    tests: [{ input: testInput, expected: 15 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testInput, expected: 12 }],
    solution: part2,
  },
  trimTestInputs: true,
})
