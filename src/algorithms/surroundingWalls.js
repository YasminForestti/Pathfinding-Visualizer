



export default function determinant(beginning, end, matrix){
    console.log(matrix)
    let idsOfTheDeterminant = []
    function valid(i, j){
        if(i < 0 || i > 30) return false
        if(j < 0 || j > 60) return false
        return true
    } 
    const diri = [0, 1, 0, -1]
    const dirj = [1, 0, -1, 0]
    if(beginning && end){
        for(let i = 0; i <= 30; i++){
            for(let j = 0; j <= 60; j++){
                if (matrix[i][j] === 'wall'){
                    continue
                }
                for(let p = 0; p < 4; p++){
                    let  pi = i + diri[p]
                    let pj = j + dirj[p]
                    if(valid(pi, pj) && matrix[pi][pj] === 'wall'){
                        if(!idsOfTheDeterminant.includes(`${i}-${j}`)){
                            idsOfTheDeterminant.push(`${i}-${j}`)
                        }
                    }
                }
            }
        }
        console.log(idsOfTheDeterminant)
        return idsOfTheDeterminant
    } else {
        window.alert(`Please Select the Blocks `)
        return null
    }

}