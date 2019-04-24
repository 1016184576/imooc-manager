import React from 'react';
import { Card, Row,  Col, Modal } from "antd"
import "./index.less";

const { Meta } = Card;

export default class Gallerys extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      imgList:[],
      visible:false,
      currentImgSrc:''
    }
  }
  componentWillMount(){
    this.getInitImgList();
  }

  handleClick = (imgSrc) => {
    this.setState({
      visible: true,
      currentImgSrc: '/gallery/' + imgSrc
    })
  }
  
  getInitImgList = () => {
    const list = [
      ['1.png','2.png','3.png','4.png','5.png'],
      ['6.png','7.png','8.png','9.png','10.png'],
      ['11.png','12.png','13.png','14.png','15.png'],
      ['16.png','17.png','18.png','19.png','20.png'],
      ['21.png','22.png','23.png','24.png','25.png']
    ]

    let tempList = list.map(item=>{
      return item.map(img=>{
        return (
          <Card
            cover={<img alt="example" src={'/gallery/' + img} />}
            key={img}
            style={{marginBottom:'10px'}}
            onClick={()=>this.handleClick(img)}
          >
            <Meta
              title="React Admin"
              description="admin.51purse.com"
            />
          </Card>
        )
      })
    })
    this.setState({
      imgList: tempList
    })
  }

  render() {
    return (
      <div className="gallery-warp">
        <Row gutter={10}>
          <Col md={5}>
            {this.state.imgList[0]}
          </Col>
          <Col md={5}>
            {this.state.imgList[1]}
          </Col>
          <Col md={5}>
            {this.state.imgList[2]}
          </Col>
          <Col md={5}>
            {this.state.imgList[3]}
          </Col>
          <Col md={4}>
            {this.state.imgList[4]}
          </Col>
        </Row>
        <Modal 
          width={450}
          title="图片画廊"
          visible={this.state.visible}
          onCancel={()=>{
            this.setState({
              visible: false
            })
          }}
          footer={null}
        >
          <img src={this.state.currentImgSrc} alt="" style={{width:'100%'}}/>
        </Modal>
      </div>
    )
  }
}