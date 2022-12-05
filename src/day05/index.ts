import run from "aocrunner"

type Stack = string[]
type Instruction = [number, number, number]
type Input = {
  stacks: Stack[]
  instructions: Instruction[]
}

const parseInput = (rawInput: string): Input => {
  const [rawStacks, rawInstructions] = rawInput.split("\n\n")
  const stacks = [...Array(11)].map<string[]>(() => [])

  const res = rawStacks
    .split("\n")
    .slice(0, rawStacks.split("\n").length - 1)
    .map((x) => x.match(/(\w)|\s{4}/g)!)
  res.forEach((l) => {
    l.forEach((x, i) => {
      if (x.length === 1) {
        stacks[i + 1].unshift(x)
      }
    })
  })

  const instructions = rawInstructions
    .split("\n")
    .map((x) => x.match(/(\d+)/g)!.map(Number)) as Instruction[]

  return { stacks, instructions }
}

const part1 = (rawInput: string) => {
  const { stacks, instructions } = parseInput(rawInput)

  instructions.forEach(([n, from, to]) => {
    const taken = stacks[from].splice(stacks[from].length - n)
    taken.reverse()
    stacks[to].push(...taken)
  })

  const result = stacks
    .filter((stack) => stack.length)
    .map((stack) => stack[stack.length - 1])
    .join("")

  return result
}

const part2 = (rawInput: string) => {
  const { stacks, instructions } = parseInput(rawInput)

  instructions.forEach(([n, from, to]) => {
    const taken = stacks[from].splice(stacks[from].length - n)
    // 9001 moves multiple, no need to reverse
    // taken.reverse()
    stacks[to].push(...taken)
  })

  const result = stacks
    .filter((stack) => stack.length)
    .map((stack) => stack[stack.length - 1])
    .join("")

  return result
}

const testInput = `     [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

run({
  part1: {
    tests: [{ input: testInput, expected: "CMZ" }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testInput, expected: "MCD" }],
    solution: part2,
  },
  trimTestInputs: false,
})
