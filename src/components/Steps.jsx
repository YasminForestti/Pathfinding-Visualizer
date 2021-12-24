import React, {Component} from 'react'
import {selectedAlgorithm} from './Header'
//import {ListaVisitados, ListaCaminho} from 'App'
import '../main/Grid.css'
import './Steps.css'





function creatingMatrix(){
  let matrix = []
    let weights = [...document.getElementsByClassName('weight')]
  for(let i = 0; i <= 30; i++){
    matrix[i] = new Array(61)
  }
  let walls = [...document.getElementsByClassName('walls')]

  walls.forEach(wall => {
    let rowOfTheWall, columnOfTheWall
    [rowOfTheWall, columnOfTheWall] = wall.id.split('-')
    matrix[rowOfTheWall][columnOfTheWall] = 'wall'
    

  })
  weights.forEach(weight => {
    let rowOfTheWall, columnOfTheWall
    [rowOfTheWall, columnOfTheWall] = weight.id.split('-')
    matrix[rowOfTheWall][columnOfTheWall] = 5
  })
  return matrix
}




let reproducing = false
class Steps extends Component {
  state = {
    limpar: false,
    conteudoDoBotao: 'REPRODUCE',
    indiceSeta: 0
  }

  TesteButao() {
    

    console.log(selectedAlgorithm)
    if(selectedAlgorithm){

      let beginning = document.getElementsByClassName('beginning')[0]
      let end = document.getElementsByClassName('end')[0]
      if(beginning && end){
        let listsFromTheAlgorithm = selectedAlgorithm(beginning.id, end.id, creatingMatrix())
        if(listsFromTheAlgorithm !== -1){
          reproducing = true
          this.setState(
            {
              limpar: true,
              conteudoDoBotao: 'CLEAR',
            }
          )
          let lista = listsFromTheAlgorithm.visitList 
          let shortestPathList = listsFromTheAlgorithm.path 
          console.log(shortestPathList)
  
          let pathShow = false
          let counter = 0
          let interval = setInterval(()=>{
            if(!this.state.limpar){
              clearInterval(interval)
            }
  
            if(counter === lista.length && !pathShow){
              counter = 0
              pathShow = true
            } else if (counter === shortestPathList.length && pathShow) {
              clearInterval(interval)
            } else {
              pathShow ? this.pintarQuadradinho(shortestPathList[counter], pathShow) : this.pintarQuadradinho(lista[counter], pathShow)
              counter++
            }
          }, 20)      
          
        } else {
          window.alert('There is No possible Path')
        }
      } else {
        window.alert('Please Select the Blocks')
      }
      } else {
        window.alert('Please Select an Algorithm')
      }


  }

  limpar() {
    reproducing=false
    let visitadosLista = document.getElementsByClassName('Visitados')
    let weightList = document.getElementsByClassName('weight')

    let visitedOrSeenList = [...visitadosLista]
    let arrWeightList = [...weightList]

    visitedOrSeenList.forEach(visitedOrSeen => {
        visitedOrSeen.className = 'block'
    })
    arrWeightList.forEach(weightBlock => {
        weightBlock.className = 'block'
    })
    this.setState(
      {
      limpar: false,
      conteudoDoBotao: 'REPRODUCE'
    } )

  }


  pintarQuadradinho(ids, pathShow){
    if(this.state.limpar){
      
      if(pathShow){
        let block = document.getElementById(ids)
        console.log(block)
        block.className = 'block Visitados Path'
      } else {
        
        ids.forEach(id => {
          let block = document.getElementById(id)
          block.className += ' Visitados'
    
        })
      }
    }
  }

// Esse metodo de setInterval pode dar problemas de performance

  render() {

    return (
        <div className='Steps'>
          <button className='StepFoward'> </button>
          <button
            className='Reproduce' onClick={()=>{

            if (this.state.limpar) {
              this.limpar()
            }
            else {this.TesteButao()}
            }

          }> {this.state.conteudoDoBotao}
          </button>

          <button className='StepBack'> </button>
        </div>
      )
  }


}

export {Steps, reproducing}
