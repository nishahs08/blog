import { useState } from "react"

function App() {
  const [posts, setPosts] = useState([]);

  function addPost(post) {
    setPosts([...posts, { ...post, id: posts.length + 1 }]);

  }

  function addComment(comment, postId) {
    let tempPost = posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, comment] }
      }
      return post
    });
    setPosts(tempPost);

  }
  return <div style={{ width: '80%', margin: '0 auto' }}>
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <CreatePost onCreatePost={addPost} />
    </div>
    <div style={{ width: '100%' }}>
      {
        posts.map((post, index) => <Post post={post} addComment={addComment} />)
      }
    </div>
  </div>
}

function CreatePost(props) {
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');
  function clickHandle() {
    let post = {
      heading, content, comments: []
    }
    props.onCreatePost(post)
    setContent('');
    setHeading('')
  }
  return <>
    <input value={heading} onChange={(e) => setHeading(e.target.value)} style={{ marginBottom: '5px', padding: '10px' }} placeholder='What shall we dicuss today'></input>
    <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={7} style={{ padding: '10px' }} placeholder='Content'></textarea>
    <button style={{ width: '100px', padding: '10px', margin: '10px 0 10px 0' }} onClick={clickHandle}>Create Post</button>
  </>
}

function Post(props) {
  const [comment, setComment] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  let { heading, content, comments, id } = props.post;
  function addComment() {
    props.addComment(comment, id);
    setComment('')
    setIsReplying(false)
  }
  return <div style={{ border: '1px dotted black', display: 'flex', flexDirection: 'column', maxWidth: '100%', padding: '10px', marginTop: '10px' }}>
    <div style={{ border: '1px solid black', padding: '10px' }}>
      <h2 style={{ margin: 0 }}>{heading}</h2>
      <p style={{ margin: 0 }}>{content}</p>
    </div>
    {
      (!isReplying) &&
      <button style={{ width: '100px', padding: '5px', margin: '10px 0 10px auto' }} onClick={() => setIsReplying(true)}>Reply</button>
    }
    {
      isReplying
      &&
      <>
        <textarea rows={4} style={{ marginBottom: '5px', padding: '10px' }} placeholder='Comment' value={comment} onChange={(e) => setComment(e.target.value)} ></textarea>
        <button style={{ width: '100px', padding: '5px', margin: '10px 0 10px auto' }} onClick={addComment}>Post</button>
      </>
    }
    {
      comments.map((comment, index) => <Comment comment={comment} key={index} />)
    }
  </div>
}

function Comment(props) {
  return <>
    <div style={{ width: '80%', marginLeft: 'auto', border: '1px solid black', borderRadius: '7px', backgroundColor: 'white', padding: '10px', marginTop: '10px' }}>
      <span>{props.comment}</span>
    </div>

  </>
}
export default App;
