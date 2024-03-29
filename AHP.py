from heapq import heappush, heappop, heapify

def findSet(parent, u):
    if parent[u] == u:
        return u
    parent[u] = findSet(parent, parent[u])
    return parent[u]

def unionSet(parent, rnk, u, v):
    u = findSet(parent, u)
    v = findSet(parent, v)
    if u != v:
        if rnk[u] < rnk[v]:
            temp = u
            u = v
            v = temp
        parent[v] = u
        if rnk[u] == rnk[v]:
            rnk[u]+=1

class Edge:
    def __init__(self, _u, _v, _w):
        self.u = _u
        self.v = _v
        self.w = _w
    def __lt__(self, E):
        return self.w < E.w

def AHP(edge, n):
    
    heapify(edge)

    parent = [i for i in range(n)]
    rnk = [0 for i in range(n)]
    path = []
    restore = []
    vis = [False]*n
    w = 0
    
    i = 0
    while i < n/2:
        e = heappop(edge)
        if findSet(parent, e.u) != findSet(parent, e.v) and not vis[e.u] and not vis[e.v]:
            vis[e.u] = vis[e.v] = True
            unionSet(parent, rnk, e.u, e.v)
            path.append((e.u,e.v))
            print(path)
            w += e.w
            i += 1
        else:
            restore.append(Edge(e.u,e.v,e.w))
    
    for e in restore:
      heappush(edge, Edge(e.u, e.v, e.w))
    
    vis = [False]*n
    
    i = 0
    while i < n/2-1:
        e = heappop(edge)
        if findSet(parent, e.u) != findSet(parent, e.v) and not vis[e.u] and not vis[e.v]:
            vis[e.u] = vis[e.v] = True
            unionSet(parent, rnk, e.u, e.v)
            path.append((e.u, e.v))
            print(path)
            w += e.w
            i += 1
    
    # Approximation-of-Hamiltonian-Cycle
    # freq = [0]*n
    # for p in path:
    #   freq[p[0]] += 1
    #   freq[p[1]] += 1
    # u = freq.index(1)
    # freq[freq.index(1)] = 2
    # v = freq.index(1)
    # path.append((u, v))

    return path, w

edge = [ # u, v, w
  Edge(0,1,1),
  Edge(0,2,1),
  Edge(0,3,1),
  Edge(1,2,2),
  Edge(1,3,3),
  Edge(2,3,2)
]

for e in edge:
  print(e.u, "<->", e.v, ", W:", e.w)

path, w = AHP(edge, 4)
print("Final result", path, "TW:", w)
