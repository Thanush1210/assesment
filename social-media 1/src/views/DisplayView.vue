<template>
  <div>
    <h1 class="header logo">Vuetter</h1>
    <div v-if="postDataSet.length > 0">
      <div
        v-for="(post, index) in postDataSet"
        :key="index"
        class="post-container"
      >
        <div class="post-header">
          <h1>Vuetweet</h1>
          <h2><span><Tweet:-></Tweet:-></span>{{ post.tweet }}</h2>
          <h3 class="post-caption">{{ post.caption }}</h3>
        </div>
        <div class="post-footer">
          <div v-if="post.comments" class="comments-container">
            <h3>Comments:</h3>
            <div class="comment-dis">
              <p class="comment-line">{{ post.comments }}</p>
              <button
                type="button"
                @click="editComment(index)"
                class="edit-comment-button"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
        <button type="button" @click="editPost(index)" class="edit-button">
          Edit
        </button>
        <button type="button" @click="deletePost(post.id , index)" class="delete-button">
          Delete
        </button>
        <div v-if="post.editing" class="edit-form-container">
          <form @submit.prevent="saveEdit(index)">
            <label for="editCaption">New Caption:</label>
            <input
              type="text"
              v-model="post.newCaption"
              class="edit-caption-input"
            />
            <label for="editTweet">New VueTweet:</label>
            <input
              type="text"
              v-model="post.newTweet"
              class="edit-tweet-input"
            />
            <button type="submit" class="save-button">Save</button>
          </form>
        </div>
      </div>
    </div>
    <UsersData @post-data="addData" @caption-data="addData" />
  </div>
</template>

<script>
import UsersData from "../components/UsersData.vue";
import axios from "axios";

export default {
  data() {
    return {
      postDataSet: [
        {
          tweet: "",
          caption: "",
          comments: "",
          editing: false,
          newCaption: "",
          newTweet: "",
          showCommentInput: false
        }
      ],
      newComment: "",
      commentIndex: null
    };
  },
  mounted() {
    this.fetchPostData();
  },
  components: {
    UsersData
  },
  methods: {
    async fetchPostData() {
      try {
        const response = await axios.get("http://localhost:3333/api/media");
        this.postDataSet = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    addData(data) {
      const post = {
        tweet: data.tweet,
        caption: data.caption,
        comments: data.comment,
        editing: false,
        newCaption: "",
        newTweet: "",
        showCommentInput: false
      };
      this.postDataSet.push(post);
      console.log(post);
    },
    
    editPost(index) {
      const post = this.postDataSet[index];
      post.editing = true;
      post.newCaption = post.caption;
      post.newTweet = post.tweet;
    },
    saveEdit(index) {
      const post = this.postDataSet[index];
      post.caption = post.newCaption;
      post.tweet = post.newTweet;
      post.editing = false;
      post.newCaption = "";
      post.newTweet = "";
    },
    editComment(index) {
      const post = this.postDataSet[index];
      post.showCommentInput = true;
      this.newComment = post.comments;
      this.commentIndex = index;
    },
    deletePost(id, index) {
      axios
        .delete(`http://localhost:3333/api/media/${id}`)
        .then((response) => {
          console.log("Post deleted successfully:", response.data);
          this.postDataSet.splice(index, 1);
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    }
  }
};
</script>


<style>
.comment {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  padding: 10px;
  margin-bottom: 10px;
  background-color: #a6d8f0;
  width: 60%;
}

.comment-dis {
  display: flex;
}
.new-tweet {
  width: 300px;
  height: auto;
  border-radius: 5px;
  margin-top: 10px;
}
.edit-form-container {
  margin-top: 20px;
}

.edit-caption-input {
  width: 300px;
  padding: 5px;
  margin-right: 10px;
}

.save-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.save-button:hover {
  background-color: #0056b3;
}

.edit-button {
  padding: 5px 10px;
  background-color: #ffc107;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

.delete-button {
  padding: 5px 10px;
  background-color: #fa3838;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

.edit-button:hover {
  background-color: #e0a800;
}

.edit-comment-button {
  padding: 2px 5px;
  background-color: #ffc107;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  font-size: 12px;
}

.edit-comment-button:hover {
  background-color: #e0a800;
}
.edit-form-container {
  margin-top: 20px;
}

.edit-caption-input {
  width: 300px;
  padding: 5px;
  margin-right: 10px;
}

.save-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.save-button:hover {
  background-color: #0056b3;
}

.edit-button {
  padding: 5px 10px;
  background-color: #ffc107;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

.edit-button:hover {
  background-color: #e0a800;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #a6d8f0;
  padding: 10px;
  border-bottom: 1px solid #dbdbdb;
}

.logo {
  font-family: "Grand Hotel", cursive;
  font-size: 32px;
  color: #262626;
  margin: 0;
  padding: 0;
}

.post-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #dbdbdb;
  background-color: #b4e8e8;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-family: cursive;
}

.post-tweet {
  width: 300px;
  height: auto;
  border-radius: 5px;
}

.post-caption {
  font-weight: bold;
  margin-top: 10px;
}

.comments-container {
  margin-top: 20px;
}

.comment {
  margin-bottom: 10px;
}

.comment-input-container {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.comment-input {
  width: 300px;
  padding: 5px;
  margin-right: 10px;
}

.submit-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
