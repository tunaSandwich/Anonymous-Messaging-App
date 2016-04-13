//firebase reference
var rootRef = new Firebase('https://luminous-heat-206.firebaseio.com/');


// Messaging
$("#submit-btn").bind("click", function(){
  var comment = $("#comments");
  var commentVal = $.trim(comment.val());

  if (commentVal.length === 0){
    alert("Comments with characters are required!");
  }
    else{
      rootRef.push({comment: commentVal}, function(error) {
        if (error !== null) {
            alert('Unable to push comments to Firebase!');
        }
       });
       comment.val("");
      }
      return false;
  });


//extract a comment from the "snapshot of data"
rootRef.on('child_added', function(snapshot){
  var uniqName = snapshot.name();
  var comment = snapshot.val().comment;
  //rendering comments
  var commentsContainer = $('#comments-container');

  $('<div/>', {class: 'comment-container'})
      .html('<span class="label label-default">Comment '
       + uniqName + '</span>' + comment).appendTo(commentsContainer);

      commentsContainer.scrollTop(commentsContainer.prop('scrollHeight'));
});
