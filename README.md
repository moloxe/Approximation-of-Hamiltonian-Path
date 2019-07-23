# Approximation-of-Hamiltonian-Path
This algorithm looks for an approximate result (local maximum) for the problem of the Hamiltonian Path, involves the techniques observed in the Kruskal algorithm. **The time complexity of the present algorithm is O (E log E)**, with "E" as the number of edges.

## Steps
### Step 1
Add the two nodes with the shortest distance to the solution with the condition that the selected nodes have not been visited and also belong to a different set, the selected nodes are marked as visited and their sets are joined. Repeat until accumulating n/2 edges.
### Step 2
Mark the visited list in false and add the two nodes with the shortest distance to the solution with the same condition. Repeat until n-1 edges are reached.

## Simulation

<p align="center">
  <img src="https://github.com/francoMG/Approximation-of-Hamiltonian-Path/blob/master/simulation.gif"
        alt="drawing" width="400"/>
</p>

## Algorithm testing
[Try here](https://repl.it/@FrancoMG/AHP)

<p align="center">
  <img src="https://github.com/francoMG/Approximation-of-Hamiltonian-Path/blob/master/test.png"
        alt="drawing" width="400"/>
</p>

## Additionally
If you look for the edge that closes the cycle, you can also consider it as a local solution for the **Hamiltonian Cycle** problem, related to the TSP. To carry out this step it is necessary that the digraph can form at least one cycle.
