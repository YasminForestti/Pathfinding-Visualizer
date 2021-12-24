import React, { Component } from 'react'
import bfs from '../algorithms/bfs'
import {selectedAlgorithm} from './Header'

class Subtitle extends Component{
    state = {
        nowAlgorithm : null,
        ordem :null,
        time : null,
        texto : null
    }
    
    lookingAlgorithms(){
        this.setState({nowAlgorithm: selectedAlgorithm})
        if(nowAlgorithm === dijkstra){
            this.state
        }
    }

    render(){
        return(
            <div className = 'subtitle'>
                <div>{this.ordem}</div>
                <div>
                    <p></p>
                </div> 
            </div>
        ) 
    }
}
// const Subtitle = function (){
//     var nowAlgorithm = selectedAlgorithm

//     if (nowAlgorithm === dijkstra){
//         var ordem = 'log(m)'            
//     }else if( nowAlgorithm === Astar ){
//         var ordem = 
//     }else if( nowAlgorithm ==== bfs){

//     }
//     return(
        
        
//     )
// }
export default Subtitle