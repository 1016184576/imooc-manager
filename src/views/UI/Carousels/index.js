import React from 'react';
import { Card, Carousel } from "antd"
import "./index.less";



export default class Carousels extends React.Component{
  constructor(props){
    super(props)
    this.state = {
    
    }
  }
  render(){
    return(
      <div className="carousel-warp">
        <Card title="文字背景轮播" className="card">
          <Carousel 
            autoplay={true}
          >
            <div><h3>Ant Motion Banner - React</h3></div>
            <div><h3>Ant Motion Banner - Vue</h3></div>
            <div><h3>Ant Motion Banner - Angular</h3></div>
          </Carousel>
        </Card>
        <Card title="图片轮播" className="card">
        <Carousel 
            autoplay={true}
          >
            <div><img src={'/carousel/carousel-1.jpg'} alt=""/></div>
            <div><img src={'/carousel/carousel-2.jpg'} alt=""/></div>
            <div><img src={'/carousel/carousel-3.jpg'} alt=""/></div>
          </Carousel>
        </Card>
      </div>
    )
  }
}