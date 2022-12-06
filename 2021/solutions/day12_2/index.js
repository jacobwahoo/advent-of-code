import Node from "../../Node.js";

const day12_2 = {
  solve: (input) => {
    return calculateSolution(parseInput(input));
  },
};

const parseInput = (input) => {
  let nodes = {};
  input.split("\r\n").forEach((line) => {
    let lineNodes = line.split("-");
    let node0;
    let node1;
    if (Object.keys(nodes).includes(lineNodes[0])) {
      node0 = nodes[lineNodes[0]];
    } else {
      node0 = new Node();
      node0.name = lineNodes[0];
      nodes[lineNodes[0]] = node0;
    }
    if (Object.keys(nodes).includes(lineNodes[1])) {
      node1 = nodes[lineNodes[1]];
    } else {
      node1 = new Node();
      node1.name = lineNodes[1];
      nodes[lineNodes[1]] = node1;
    }

    if (node0.name !== "start") node1.neighbors.push(node0);
    if (node1.name !== "start") node0.neighbors.push(node1);
  });

  return nodes;
};

const calculateSolution = (parsedInput) => {
  let startNode = parsedInput["start"];
  let found = [];
  let count = paths(startNode, [], false, [], found);
  return count;
};

const paths = (currentNode, visitedNodes, smallTwice, allVisitedNodes, found) => {
  let count = 0;
  if (visitedNodes.length - new Set(visitedNodes).size > 1){
    console.log(allVisitedNodes);
    return 0;
  }
  if (currentNode.name == "end") {
    found.push([...allVisitedNodes, 'end']);
    return 1;
  }
  for (let neighbor of currentNode.neighbors) {
    if (!visitedNodes.includes(neighbor.name) || !smallTwice) {
      if (isBig(currentNode.name)) {
        count += paths(neighbor, [...visitedNodes], smallTwice, [...allVisitedNodes, currentNode.name], found);
      } else {
        if (isSmall(currentNode.name) && visitedNodes.includes(currentNode.name)) {
          smallTwice = true;
        }
        count += paths(neighbor, [...visitedNodes, currentNode.name], smallTwice, [...allVisitedNodes, currentNode.name], found);
      }
    }
  }
  return count;
};

const isBig = (name) => {
  return name[0] >= "A" && name[0] <= "Z";
};

const isSmall = (name) => {
  return !isBig(name) && name !== "start" && name !== "end";
};

export default day12_2;
