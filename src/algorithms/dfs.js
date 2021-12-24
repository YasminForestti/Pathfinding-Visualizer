function dfs(idBeginning, idEnd, matrix){
    let ibeg, jbeg, iend, jend
    let visitList = []
    let path = []
    let seen = []
    let pai = []
    ibeg = Number(idBeginning.split('-')[0])
    jbeg = Number(idBeginning.split('-')[1])
    iend = Number(idEnd.split('-')[0])
    jend = Number(idEnd.split('-')[1])

    const diri = [0, 1, 0, -1]
    const dirj = [1, 0, -1, 0]
    
    function valid(i, j){
        if(i >= 31 || i < 0) return false
        if(j >= 61 || j < 0) return false
        if(seen[i][j]) return false
        if(matrix[i][j] === 'wall') return false
        if( i === iend && j === jend) return false
        return true
      } 
      
      for(let i = 0; i <= 30; i++){
        seen[i] = new Array(61)
        pai[i] = new Array(61)
      }
      
      function alg(i,j){
          seen[i][j] = true
          if( iend === i && jend === j){
            let nowParent = pai[iend][jend]
            while (pai[nowParent[0]][nowParent[1]] !== -1 ){
              path.push(`${nowParent[0]}-${nowParent[1]}`)
              nowParent = pai[nowParent[0]][nowParent[1]]
            }
            path.reverse()
            return 
          }
          for(let dir = 0; dir < 4; dir ++){
            let newdiri = i + diri[dir]
            let newdirj = j + dirj[dir]

            if (valid(newdiri,newdirj)){
              visitList.push(`${newdiri}-${newdirj}`)
              pai[newdiri][newdirj] = [i,j]
              dfs(newdiri,newdirj)
            }
          }
          
      }
   alg(ibeg,jbeg) 
   if(path){
      return {visitList, path}
   }
      
   return -1
}
export default dfs