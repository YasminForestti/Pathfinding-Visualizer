import TinyQueue from 'tinyqueue';

function dijkstra(idBeginning, idEnd, matrix){
    let ibeg, jbeg, iend, jend;
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
    let queue = new TinyQueue([], function(a, b){
      return a.dist - b.dist;
    })
    let seen = []
    let dist = []
    for(let i = 0; i <= 30; i++){
        seen[i] = new Array(61)
        dist[i] = new Array(61)
        for(let j = 0; j <= 60; j++){
            dist[i][j] = Infinity
        }
    }
    const diri = [0, 1, 0, -1]
    const dirj = [1, 0, -1, 0]
    let visitList = []

    dist[ibeg][jbeg] = 0
    queue.push({
      i: ibeg,
      j: jbeg,
      dist: dist[ibeg][jbeg]
    })
    while(queue.length > 0){
      let iFirst = queue.peek().i
      let jFirst = queue.peek().j
      queue.pop()
      seen[iFirst][jFirst] = true
      
      //console.log(`${iFirst}-${jFirst} to ${iend}-${jend}`)
      if(iFirst === iend && jFirst === jend){
          return visitList
      }
      let visitInTheIteration = []

      for(let dir = 0; dir < 4; dir++){
        let newDiri = iFirst + diri[dir]
        let newDirj = jFirst + dirj[dir]

        if(valid(newDiri, newDirj)){
          let newdist = 1 + dist[iFirst][jFirst];
          if(newdist < dist[newDiri][newDirj]){
              dist[newDiri][newDirj] = newdist
              queue.push({
                i: newDiri,
                j: newDirj,
                dist: newdist               
              })
              if(!(newDiri === iend  && newDirj === jend)){

                visitInTheIteration.push(`${newDiri}-${newDirj}`)
              }
          }
          
        }
      }
      visitList.push(visitInTheIteration)

    }
    console.log(visitList)
    return visitList
}


export default dijkstra