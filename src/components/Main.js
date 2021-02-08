import React, { useState } from 'react';

function Main(props) {
  const [textValue, setTextValue] = useState('')
  const [imgValue, setImgValue] = useState([])

  function handleTextChange(e) {
    setTextValue(e.target.value)
  }

  async function convertPost(e) {
    const imgObj = e.target.files[0];
    const reader = new FileReader()
    await reader.readAsArrayBuffer(imgObj)
    reader.onloadend = () => {
      setImgValue(Buffer(reader.result))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    props.addPost(imgValue, textValue)
  }

  function postList() {
    const listItems = props.postArr.map((post) =>
      <li key={post.id.toNumber()}>
        <div>{post.text}</div>
        <img src={`https://ipfs.infura.io/ipfs/${post.hash}`}/>
      </li>
    )
    return (
      <ul>
        {listItems}
      </ul>
    )
  }

  return (
    <div>
      <div>Account #: {props.account}</div>

      <form onSubmit={handleSubmit}>
        <div>
          Text:
          <input type="text" value={textValue} onChange={handleTextChange} />
        </div>
        <div>
          Image:
          <input type="file" accept=".jpg, .png" onChange={convertPost} />
        </div>
        <input type="submit" value="Submit" />
      </form>
      <div>
        {postList()}
      </div>
    </div>
  );

}

export default Main;
