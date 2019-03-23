import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

export default class Editor extends React.Component {

  state = {
    editorState: null,
  }
   componentDidMount () {
    const htmlContent = this.props.value;
    this.setState({
      editorState: BraftEditor.createEditorState(htmlContent)
    });
  }

  submitContent = async () => {
    const htmlContent = this.state.editorState.toHTML()
    await this.props.saveEditorContent(htmlContent)
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  render () {
    const { editorState } = this.state

    return (
      <div className="my-component">
        <BraftEditor style={{height:'auto'}}
          value={editorState}
          onChange={this.handleEditorChange}
          onBlur={this.submitContent}
        />
      </div>
    )

  }

}
