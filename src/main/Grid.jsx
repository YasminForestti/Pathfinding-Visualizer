import React, {Component} from 'react'
import blackPincel from '../assets/images/big-paint-brush.svg'
import bluePincel from '../assets/images/big-paint-brush-blue.svg'
import yellowCheese from '../assets/images/cheese-triangular-piece-with-holes-yellow.svg'
import blackCheese from '../assets/images/cheese-triangular-piece-with-holes.svg'
import orangeEraser from '../assets/images/eraser-tool-for-school-orange.svg'
import blackEraser from '../assets/images/eraser-tool-for-school.svg'
import blackWeight from '../assets/images/weight.svg'
import pinkWeight from '../assets/images/weight-pink.svg'
import blackMouse from '../assets/images/mouse.svg'
import greenMouse from '../assets/images/mouse-green.svg'
import {Steps} from '../components/Steps'
import {reproducing} from '../components/Steps'
import './Grid.css'



class Block extends Component {
    paint(e, isEraser, isWall, isWeight){
        if(e.type === 'click'){
            let lastPainting = document.getElementsByClassName(this.props.selectedBtn)[0]
            if(lastPainting && !isEraser && !isWall && !isWeight){
                lastPainting.className = 'block'
            }

            isEraser? e.target.className = `block` : e.target.className = `block ${this.props.selectedBtn}`
        } else if (this.props.clicked) {
            isWall || isWeight ? e.target.className = `block ${this.props.selectedBtn}` : e.target.className = `block`
        }
    }

    render(){
        return (
            <div className={`block`}
                id={this.props.id}
                onMouseMove={e => { 
                    let isWall = this.props.selectedBtn === 'walls'
                    let isEraser = this.props.selectedBtn === 'eraser'
                    let isWeight = this.props.selectedBtn === 'weight'
                    if(reproducing) return
                    if(isWall || isEraser || isWeight){
                        return this.paint(e, isEraser, isWall, isWeight)
                    } 
                    return 
                }}
                onClick={e => {
                    if(!reproducing && this.props.selectedBtn){
                        return this.paint(e, this.props.selectedBtn==='eraser', this.props.selectedBtn==='walls', this.props.selectedBtn==='weight')
                    }
                    return
                }}
            >
      
            </div>
        )
    }
    
}


class PaintBtn extends Component{

    images = {
        beginning: [blackMouse, greenMouse],
        end: [blackCheese, yellowCheese],
        walls: [blackPincel, bluePincel],
        eraser: [blackEraser, orangeEraser],
        weight: [blackWeight, pinkWeight]

    }

    render(){
        return (

        <div className="paintButton">
            <div className="pincel" id={this.props.id} onClick={e => this.props.onClick(e)}>
                <img src={this.images[this.props.id][this.props.srcIndex]} alt=""/>
            </div>
            <p>{this.props.children}</p>
        </div>    
        )
    }
}
class Grid extends Component {    
    state = {
        selectedButton: null,
        beginning: 0,
        end: 0,
        walls: 0,
        eraser: 0,
        gridAreaClicked: 0,
        weight: 0
    }
    setClicked(e, click){
        e.preventDefault()
        this.setState({clicked: click})
    }
    creatingGridArea(){
        let numColums = 60
        let numRows = 30
        let blocks = []
        for(let i = 0; i <= numRows; i++){
            for(let j = 0; j <= numColums; j++){
                blocks.push(<Block clicked={this.state.clicked} selectedBtn={this.state.selectedButton} id={`${i}-${j}`}></Block>)
            }
        }
        return blocks
    }

    changeTheSelectedButton(e){
        let newSelectedBtn = e.currentTarget.id
        let oldSelectedBtn = this.state.selectedButton
        if(oldSelectedBtn === newSelectedBtn || !oldSelectedBtn){
            let togglingBtn = {...this.state}
            togglingBtn[newSelectedBtn] = this.state[newSelectedBtn] ? 0 : 1
            togglingBtn.selectedButton = oldSelectedBtn? null : newSelectedBtn 
            this.setState(togglingBtn)
        } else {
            let changingBtn = { ...this.state}
            changingBtn.selectedButton = newSelectedBtn
            changingBtn[newSelectedBtn] = 1
            changingBtn[oldSelectedBtn] = 0
            this.setState(changingBtn)
        }
    }
    render(){
        return (
            <div className="grid">
                <div className="grid-area"
                    onMouseUp={e => {
                        this.setClicked(e, false)
                    }}
                    onMouseDown={e => {
                        this.setClicked(e, true)
                    }}
                    onMouseLeave= {e => {
                        this.setClicked(e, false)
                    }}
                >
                    {this.creatingGridArea()}
                </div>
                <div className="grid-controls">
                    <div className="grid-paint">
                        <PaintBtn id="beginning" onClick={this.changeTheSelectedButton.bind(this)} srcIndex={this.state.beginning}>Put the Mouse</PaintBtn>
                        <PaintBtn id="end" onClick={this.changeTheSelectedButton.bind(this)} srcIndex={this.state.end}>Put the Cheese</PaintBtn>
                        <PaintBtn id="walls" onClick={this.changeTheSelectedButton.bind(this)} srcIndex={this.state.walls}>Paint the Walls</PaintBtn>
                        <PaintBtn id="eraser" onClick={this.changeTheSelectedButton.bind(this)} srcIndex={this.state.eraser}>Erase Mistakes</PaintBtn>
                        <PaintBtn id="weight" onClick={this.changeTheSelectedButton.bind(this)} srcIndex={this.state.weight}>Put the Weights</PaintBtn>
                    </div>

                    <Steps></Steps>

                </div>
            </div>
        )
    }
}


export default Grid

