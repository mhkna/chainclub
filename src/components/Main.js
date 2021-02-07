import React, { useState } from 'react';

function Main(props) {
  const [value, setValue] = useState('')

  async function handleChange(e) {
    setValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.addPost(value)
  }

  return (
    <div>
      <div>Account #: {props.account}</div>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={value} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );

}

export default Main;

// const styles = StyleSheet.create({
//   container: {
//     textAlign: 'center'
//   }
// })
