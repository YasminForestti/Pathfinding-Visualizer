import React, {Component} from 'react';
import './Header.css'

import Astar from '../algorithms/Astar' 
import bfs from '../algorithms/bfs'
import dfs from '../algorithms/dfs'
import dijkstra from '../algorithms/dijkstra'

let selectedAlgorithm = null

class Subtitle extends Component{
    state = {
       
        nowAlgorithm : null,
        texto : null
    }
    
    lookingAlgorithms(){

        console.log(this.props.id)
        if(this.props.id === 'Dij' || this.props.id === 'Astar'){
            return "Complexidade: O(m.log(n))"
        }  else if(this.props.id === 'BFS' ||this.props.id === 'DFS' ){
            return "Complexidade: O(m + n)" 
        }    

    }

    

    render(){
        
        return(
            <div >
                <div  className = 'subtitle'>{this.lookingAlgorithms()}</div>
                <div >
                    <div className = 'subBlocks'>
                        
                            <div className='subBlock amarelo'> </div> 
                 
                        Shortest Path
                    </div>

                    <div className = 'subBlocks'>
                        <div className = 'subBlock laranja'></div>Visited Nodes
                    </div>

                    <div className = 'subBlocks'> 
                        <div className = 'subBlock verde'></div> Starting Node
                    </div>
                    
                    <div className = 'subBlocks'>
                        <div className = 'subBlock vermelho'></div>Ending Nodes
                    </div>
                    
                    <div className = 'subBlocks'>
                        <div className = 'subBlock azul'></div> Wall
                    </div>

                </div>    
            </div> 
            
        ) 
    }
}
class Header extends React.Component{
    
    state = {
        
        nowButton : null
    }

    handleClickDij(event){
        console.log('Dij');
        selectedAlgorithm = dijkstra
        
    }
    
    handleClickAs(event){
        console.log('Astar');
        selectedAlgorithm = Astar
    }

    handleClickBFS(event){
        console.log('BFS');
        selectedAlgorithm = bfs
    }

    handleClickDFS(event){
        console.log('DFS');
        selectedAlgorithm = dfs
    } 
    



    teste(event){
        if(this.state.nowButton === null){
           this.setState({nowButton: event.target})  
           event.target.style.background = '#FF7070'
        }else{
            this.state.nowButton.style.background = 'rgb(117, 240, 144)'
            event.target.style.background = '#FF7070'
            this.setState({nowButton: event.target})
        }
        
    }    
        
       
    render(){
        return(
            <div className='fullHeader'>
            <div className = 'header'>
                    
                <button className='headerBtn' id = 'Dij' onClick = {event => {
                    this.handleClickDij(event);
                    this.teste(event)
                    }
                    }>
                        View Dijstra                        
                </button> 
                     
                
            
                <button className='headerBtn' id = 'Astar' onClick = {event => {
                    this.handleClickAs(event);
                    this.teste(event)
                    }
                    }>
                        View A*
                </button>                                          
                                      
             
                <button className='headerBtn'   id =  'BFS' onClick = {event => {
                    this.handleClickBFS(event);
                    this.teste(event)
                    }}>
                        View BFS
                </button>    

                <button  className='headerBtn' id =  'DFS' onClick = {event =>{
                    this.handleClickDFS(event);
                    this.teste(event)
                    } }>
                        View DFS
                </button>      
                <h1 className="title"> Pathfinding Visualizer</h1>

            </div >
            
            <div>
                <Subtitle id = {this.state.nowButton? this.state.nowButton.id : null}>
                    </Subtitle>  
            </div>
                
                                                                                   
            </div>
        )

    }
    }      
        

export {Header, selectedAlgorithm}


