

var Queue = require('@btmills/queue')



function bfs(idBeginning, idEnd, matrix){
    let ibeg, jbeg, iend, jend;
    const diri = [0, 1, 0, -1]
    const dirj = [1, 0, -1, 0]
    let queue = new Queue()
    let visitList = []
    let parent = []
    let seen = []
    console.log(matrix)
    ibeg = Number(idBeginning.split('-')[0])
    jbeg = Number(idBeginning.split('-')[1])
    iend = Number(idEnd.split('-')[0])
    jend = Number(idEnd.split('-')[1])
    
    function valid(i, j){
      if(i >= 31 || i < 0) return false
      if(j >= 61 || j < 0) return false
      if(seen[i][j]) return false
      if(matrix[i][j] === 'wall') return false
      return true
    } 
    for(let i = 0; i <= 30; i++){
      seen[i] = new Array(61)
      parent[i] = new Array(61)
    }
    queue.enqueue([ibeg, jbeg])
    parent[ibeg][jbeg] = -1
    seen[ibeg][jbeg] = true
    while(queue.length > 0){
      let iFirst = queue.peek()[0]
      let jFirst = queue.peek()[1]
      let visitInTheIteration = []
      queue.dequeue()
      if(iFirst === iend && jFirst === jend){
          let path = []
          let nowParent = parent[iend][jend];
          while(parent[nowParent[0]][nowParent[1]] !== -1){
              path.push(`${nowParent[0]}-${nowParent[1]}`)
              nowParent = parent[nowParent[0]][nowParent[1]]
          }
          
          path.reverse()
          return {visitList, path}
      }
      for(let dir = 0; dir < 4; dir++){
        let newDiri = iFirst + diri[dir]
        let newDirj = jFirst + dirj[dir]
        if(valid(newDiri, newDirj)){
          seen[newDiri][newDirj] = true
          parent[newDiri][newDirj] = [iFirst, jFirst]
          queue.enqueue([newDiri, newDirj])
          if(newDiri === iend && newDirj === jend) continue
          visitInTheIteration.push(`${newDiri}-${newDirj}`)

        }
      }
      visitList.push(visitInTheIteration)

    }

    return -1
}


export default bfs


