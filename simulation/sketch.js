function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function findSet(parent, u) {
  if (parent[u] == u)
    return u
  parent[u] = findSet(parent, parent[u])
  return parent[u]
}

function unionSet(parent, rnk, u, v) {
  u = findSet(parent, u)
  v = findSet(parent, v)
  if (u != v) {
    if (rnk[u] < rnk[v]) {
      temp = u
      u = v
      v = temp
    }
    parent[v] = u
    if (rnk[u] == rnk[v])
      rnk[u] += 1
  }
}

function setup() {
  let cnv = createCanvas(400, 400)
  cnv.parent("cnv")
}

async function draw() {

  noLoop()
  background(255);

  let n = 10
  let node = []
  for (let i = 0; i < n; i++) {
    node.push([20 + random(width - 40), 20 + random(height - 80)])
  }

  let edge = []
  let cont = 0
  stroke(222)
  strokeWeight(1)
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let w = Math.sqrt((node[i][0] - node[j][0]) ** 2 +
        (node[i][1] - node[j][1]) ** 2)
      edge.push([w, i, j])
      let x1 = node[edge[cont][1]][0]
      let y1 = node[edge[cont][1]][1]
      let x2 = node[edge[cont][2]][0]
      let y2 = node[edge[cont][2]][1]
      line(x1, y1, x2, y2);
      cont++;
    }
  }

  stroke(0)
  fill(255)
  for (let i = 0; i < n; i++)
    ellipse(node[i][0], node[i][1], 10, 10)

  let path = []
  {
    let restore = []
    let vis = []
    let parent = []
    let rnk = []
    for (let i = 0; i < n; i++) {
      parent.push(i)
      rnk.push(0)
      vis.push(false)
    }

    noStroke()
    fill(200, 0, 0)
    rect(width / 2 - 40, height - 35, 80, 30)
    fill(255)
    textSize(16)
    textAlign(CENTER, CENTER)
    text("Step 1.", width / 2, height - 20)

    cont = 0
    while (cont < n / 2) {

      edge.sort(function(a, b) {
        if (a[0] === b[0]) {
          return 0;
        } else {
          return (a[0] > b[0]) ? -1 : 1;
        }
      })

      let e = edge.pop()

      if (findSet(parent, e[1]) != findSet(parent, e[2]) &&
        vis[e[1]] == false && vis[e[2]] == false) {

        vis[e[1]] = vis[e[2]] = true
        unionSet(parent, rnk, e[1], e[2])

        let x1 = node[e[1]][0]
        let y1 = node[e[1]][1]
        let x2 = node[e[2]][0]
        let y2 = node[e[2]][1]

        stroke(200, 0, 0)
        strokeWeight(2)
        line(x1, y1, x2, y2)
        strokeWeight(1)
        stroke(0)
        fill(255)
        ellipse(x1, y1, 10, 10)
        ellipse(x2, y2, 10, 10)

        path.push([e[1], e[2]])
        cont++
        await sleep(500)
      } else {
        restore.push(e)
      }
    }
    await sleep(1000)

    noStroke()
    fill(0, 0, 200)
    rect(width / 2 - 40, height - 35, 80, 30)
    fill(255)
    textSize(16)
    textAlign(CENTER, CENTER)
    text("Step 2.", width / 2, height - 20)

    for (let e of restore) edge.push(e)
    for (let i = 0; i < n; i++) vis[i] = false

    cont = 0
    while (cont < n / 2 - 1) {

      edge.sort(function(a, b) {
        if (a[0] === b[0]) {
          return 0;
        } else {
          return (a[0] > b[0]) ? -1 : 1;
        }
      })

      let e = edge.pop()

      if (findSet(parent, e[1]) != findSet(parent, e[2]) &&
        vis[e[1]] == false && vis[e[2]] == false) {

        vis[e[1]] = vis[e[2]] = true
        unionSet(parent, rnk, e[1], e[2])

        let x1 = node[e[1]][0]
        let y1 = node[e[1]][1]
        let x2 = node[e[2]][0]
        let y2 = node[e[2]][1]

        stroke(0, 0, 200)
        strokeWeight(2)
        line(x1, y1, x2, y2)
        strokeWeight(1)
        stroke(0)
        fill(255)
        ellipse(x1, y1, 10, 10)
        ellipse(x2, y2, 10, 10)

        path.push([e[1], e[2]])
        cont++
        await sleep(500)
      }
    }
  }

  await sleep(1000)

  noStroke()
  fill(0, 200, 0)
  rect(width / 2 - 40, height - 35, 80, 30)
  fill(255)
  textSize(16)
  textAlign(CENTER, CENTER)
  text("Result.", width / 2, height - 20)

  for (let e of path) {
    let x1 = node[e[0]][0]
    let y1 = node[e[0]][1]
    let x2 = node[e[1]][0]
    let y2 = node[e[1]][1]
    stroke(0, 200, 0)
    strokeWeight(2)
    line(x1, y1, x2, y2)
    strokeWeight(1)
    stroke(0)
    fill(255)
    ellipse(x1, y1, 10, 10)
    ellipse(x2, y2, 10, 10)
  }
  
  await sleep(4000)
  loop()
}