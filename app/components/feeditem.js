import React from 'react';
export default class FeedItem extends React.Component { render() {
return (
<div className="fb-status-update panel panel-default">
        <div className="panel-body">
          <statusupdate author="Someone" postDate="Yesterday at 3:48pm"
                        location="Austin, TX">
                         ugh.
          </statusupdate>
          <hr />
          <div className="row">
            <div className="col-md-12">
              <ul className="list-inline">
                <li>
                <a href="#">
                  <span className="glyphicon glyphicon-thumbs-up">
                  </span> Like</a>
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
</ul> </div>
          </div>
        </div>
        <div className="panel-footer">
          <div className="row">
<div className="col-md-12">
<a href="#">13 people</a> like this
            </div>
          </div>
          <hr />
          <commentthread>
            <Comment author="Someone Else" postDate="20 hrs">
              hope everything is ok!</Comment>
            <Comment author="Another Person" postDate="20 hrs">
              sending hugs your way</Comment>
          </commentthread>
        </div>
</div> )
} }
