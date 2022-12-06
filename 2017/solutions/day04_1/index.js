const solution = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  return input.split("\r\n").map(row=>row.split(" "));
};

const calculateSolution = (input) => {
  let validCount = 0;
  for (let row of input) {
    row.length === new Set(row).size && validCount++;
  }
  return validCount
};

export default solution;
