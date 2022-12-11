import run from "aocrunner"
import { sum } from "../utils/index.js"

type File = number
type Dir = {
  [key: string]: Dir | File
}
type Input = Dir

const parseInput = (rawInput: string): Input => {
  const fs: Input = {}
  const dirStack = [fs]

  rawInput.split("\n").forEach((l) => {
    const curDir = dirStack[dirStack.length - 1]
    let m
    // cd <path>
    if ((m = l.match(/\$ cd (.+)/))) {
      if (m[1] === "..") {
        dirStack.pop()
      } else {
        let nextDir: Dir
        if (!(nextDir = curDir[m[1]] as Dir)) {
          nextDir = {}
        }
        curDir[m[1]] = nextDir
        dirStack.push(nextDir)
      }
    }

    // dir <dirname>
    else if ((m = l.match(/\dir (.+)/))) {
      let dir: Dir
      if (!(dir = curDir[m[1]] as Dir)) {
        dir = {}
      }
    }

    // <size> <filename>
    else if ((m = l.match(/(\d+) (.+)/))) {
      curDir[m[2]] = Number(m[1])
    }
  })
  return fs
}

const getSize = (el: Dir | File): number => {
  if (typeof el === "number") return el
  return sum(Object.values(el).map(getSize))
}
const getDirs = (dir: Dir): Dir[] =>
  Object.values(dir)
    .filter((subEl) => typeof subEl !== "number")
    .flatMap((subDir) => [subDir as Dir, ...getDirs(subDir as Dir)])

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return sum(
    getDirs(input)
      .map(getSize)
      .filter((s) => s <= 100000),
  )
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const totalSize = getSize(input)
  return Math.min(
    ...getDirs(input)
      .map(getSize)
      .filter((s) => 70000000 - totalSize + s > 30000000),
  )
}

const testInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

run({
  part1: {
    tests: [{ input: testInput, expected: 95437 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testInput, expected: 24933642 }],
    solution: part2,
  },
  trimTestInputs: true,
})
