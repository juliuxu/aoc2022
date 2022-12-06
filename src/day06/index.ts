import run from "aocrunner"

type Line = string
type Input = Line

const parseInput = (rawInput: string): Input => {
  return rawInput
}

const unique = (s: string) => new Set(s).size === s.length
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  for (let i = 4; i < input.length; i += 1) {
    const s = input.slice(i - 4, i)
    if (unique(s)) return i
  }

  return -1
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  for (let i = 14; i < input.length; i += 1) {
    const s = input.slice(i - 14, i)
    if (unique(s)) return i
  }

  return -1
}

const testInput = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`

run({
  part1: {
    tests: [
      { input: "mjqjpqmgbljsphdztnvjfqwrcgsmlb", expected: 7 },
      { input: "bvwbjplbgvbhsrlpgdmjqwftvncz", expected: 5 },
      { input: "nppdvjthqldpwncqszvftbrmjlhg", expected: 6 },
      { input: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", expected: 10 },
      { input: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", expected: 11 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: "mjqjpqmgbljsphdztnvjfqwrcgsmlb", expected: 19 },
      { input: "bvwbjplbgvbhsrlpgdmjqwftvncz", expected: 23 },
      { input: "nppdvjthqldpwncqszvftbrmjlhg", expected: 23 },
      { input: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", expected: 29 },
      { input: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", expected: 26 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
