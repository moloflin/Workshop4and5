import React from 'react';
import StatusUpdate from './statusupdate';
import CommentThread from './commentthread';
import Comment from './comment';
import {postComment} from '../server';
import {likeFeedItem} from '../server';
import {unlikeFeedItem} from '../server';

export default class FeedItem extends React.Component{
  constructor(props){
    super(props);
    // The FeedItem's inital state is what the Feed passed to us.
    this.state = props.data;
  }

  handleCommentPost(commentText) {
    // Post a comment as user ID 4, which is our mock user!
    postComment(this.state._id, 4, commentText, (updatedFeedItem) => {
      // Update our state to trigger a re-render.
      this.setState(updatedFeedItem);
    });
  }

  /**
    Triggered when the user clicks on the 'like
    or 'unlike' button.
  **/

  handleLikeClick(clickEvent) {
    // Stop the event from propagating up the DOM
    // tree, since we handle it here. Also prevents
    // the link click from causing the page to scoll to the top.
    clickEvent.preventDefault();
    // 0 represents the 'main mourse button' --
    // typically a left click
    // http://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
    if(clickEvent.button === 0) {
      // Call back function for both the like and unlike case.
      var callbackFunction = (updatedLikeCounter) => {
        // setState will overwrite the 'LikeCounter'
        // field on the current state, and will keep
        // the other field in-tact.  This is called a
        // shollow merge:
        this.setState({likeCounter: updatedLikeCounter});
      };

      if(this.didUserLiked()) {
        // User clicked 'unlike' button.
        unlikeFeedItem(this.state._id, 4, callbackFunction);
      }
      else {
        // User clicked 'like' button.
        likeFeedItem(this.state._id,4,callbackFunction);
      }
    }

  }

  /**
    Returns 'true' if the user liked the item.
    Returns 'false' if the user has not liked the item.
  **/

  didUserLiked() {
    var likeCounter = this.state.likeCounter;
    var liked = false;
    // Look for a likeCounter entry with userId 4 -- which is the
    // current user.
    for (var i=0 ;i <likeCounter.length; i++) {
      if(likeCounter[i]._id === 4) {
        liked = true;
        break;
      }
    }

    return liked;

  }



  render(){
    var likeButtonText = "Like";
    if(this.didUserLiked()){
      likeButtonText = "Unlike";
    }
    var data = this.props.data;
    var contents;
    switch(data.type) {
      case "statusUpdate":
        contents = (
          <StatusUpdate key={data._id}
                        author={data.contents.author}
                        postDate={data.contents.postDate}
                        location={data.contents.location}>
            {data.contents.contents.split("\n").map((line,i)=> {
              // Note: 'i' is the index of line in data.contents.contents
              return (
                <p key={"line" + i}>{line}</p>
              );
            })}
          </StatusUpdate>
        );
        break;
      default:
        throw new Error("Unknown FeedItem: " + data.type);
    }

    return (
      <div className="fb-status-update panel panel-default">
        <div className="panel-body">
          {contents}
          <hr />
          <div className="row">
            <div className="col-md-12">
              <ul className="list-inline">
                <li>
                <a href="#" onClick={(e) => this.handleLikeClick(e)}>
                  <span className="glyphicon glyphicon-thumbs-up"></span>
                    {likeButtonText}
                 </a>
                </li>
                <li>
                <a href="#">
                  <span className="glyphicon glyphicon-comment">
                  </span> Comment</a>
                </li>
                <li>
                <a href="#">
                  <span className="glyphicon glyphicon-share-alt">
                  </span> Share</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="panel-footer">
          <div className="row">
            <div className="col-md-12">
              <a href="#">{this.state.likeCounter.length} people</a> like this
            </div>
          </div>
          <hr />
          <CommentThread onPost={(commentText) => this.handleCommentPost(commentText)}>
            {
              data.comments.map((comment, i) => {
                return (
                  <Comment key={i}
                           author={comment.author}
                           postDate={comment.postDate}
                           stateId = {this.state._id}
                           data ={comment}
                           index = {i}
                           likeCounter = {comment.likeCounter}>

                      {comment.contents}
                  </Comment>
                );
              })
            }
          </CommentThread>
        </div>
      </div>
    )
  }
}
