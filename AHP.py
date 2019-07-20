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

    _it = 0
    while _it < n/2:
        i = heappop(edge)
        if findSet(parent, i.u) != findSet(parent, i.v) and not vis[i.u] and not vis[i.v]:
            vis[i.u] = vis[i.v] = True
            unionSet(parent, rnk, i.u, i.v)
            path.append((i.u,i.v))
            # print(path)
            w += i.w
            _it += 1
        else:
            restore.append(Edge(i.u,i.v,i.w))
    
    for i in restore:
        heappush(edge, Edge(i.u, i.v, i.w))
    
    vis = [False]*n
    
    _it = 0
    while _it < n/2-1:
        i = heappop(edge)
        if findSet(parent, i.u) != findSet(parent, i.v) and not vis[i.u] and not vis[i.v]:
            vis[i.u] = vis[i.v] = True
            unionSet(parent, rnk, i.u, i.v)
            path.append((i.u, i.v))
            # print(path)
            w += i.w
            _it += 1
    
    # local Hamiltonian Cycle
    # for i in range(n):
    #     if not vis[i]:
    #         for j in range(i+1, n):
    #             if not vis[j]:
    #                 path.append((i, j))
    #                 break
    #         break

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
  print(e.u, "->", e.v, ", W:", e.w)

path, w = AHP(edge, 4)
print("Final result", path, "TW:", w)