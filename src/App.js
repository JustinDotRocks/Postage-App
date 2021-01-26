import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import PostsList from './components/posts/PostsList';
import AddPostForm from './components/posts/AddPostForm';
import SinglePostPage from './components/posts/SinglePostPage';

const Main = styled.div`
  height: 100vh;
  width: 100vw;
`;


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route path="/posts">
            <Main>
              
            </Main>
          </Route>
          <Route>
            <Main path="/">
              <AddPostForm />
              <PostsList />
            </Main>
          </Route>
        </Switch>
      </div>

    </Router>
  );
}

export default App;
