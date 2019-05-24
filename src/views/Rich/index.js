import React from 'react';
import { Card, Button, Modal } from "antd";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import "./index.less";

export default class Rich extends React.Component {
  constructor(props){
    super(props);
    this.state={
      editorState:EditorState.createEmpty(),
      content:'',
      visible: false
    }
  }

  //获取html文本
  getHtmlText = () => {
    const { editorState } = this.state;
    let content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.setState({
      visible: true,
      content
    });
    console.log(content)
  }

  //清空内容
  emptyContent= () => {
    this.setState({
      editorState: EditorState.createEmpty()
    });
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    return (
      <div className="rich-warp">
        <Card>
          <Button type="primary" className="button" onClick={this.emptyContent}>
            清空内容
          </Button>
          <Button type="primary" onClick={this.getHtmlText}>
            获取HTML文本
          </Button>
        </Card>
        <Card title="富文本编辑器">
          <Editor
            editorState={this.state.editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>
        <Modal
          title="富文本"
          visible={this.state.visible}
          onOk={()=>{
            this.setState({
              visible: false
            })
          }}
          onCancel={()=>{
            this.setState({
              visible: false
            })
          }}
        >
          {this.state.content}
        </Modal>
      </div>
    )
  }
}
