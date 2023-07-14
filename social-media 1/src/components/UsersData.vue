<template>
  <div>
    <form class="form-container" @submit.prevent="onSubmit">
      <label for="image">Vuetweet:</label>
      <input type="text" id="image" v-model="tweet" />

      <label for="caption">Caption:</label>
      <input type="text" id="caption" v-model="caption" />

      <div class="comment-input-container">
        <label for="comment">Comment: </label>
        <input
          type="text"
          v-model="comment"
          class="comment-input"
          placeholder="Add a comment"
        />
        <button
          type="submit"
          @click="commentHandler(index)"
          class="submit-button"
        >
          Submit
        </button>
      </div>

      <button type="submit">Post</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tweet: "",
      caption: "",
      comment: "",
    };
  },
  methods: {
    async onSubmit() {
      if (!this.tweet) {
        alert("Enter your tweet before posting...");
        return;
      } else if (this.caption.trim() === "") {
        alert("Enter a caption.");
        return;
      }
      const post = {
        tweet: this.tweet,
        caption: this.caption,
        comment: this.comment,
      };
      axios
        .post("http://localhost:3333/api/media", post)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      this.$emit("post-data", post);
      this.reset();
    },
    reset() {
      this.tweet = null;
      this.caption = "";
      this.comment = "";
    },
  },
};
</script>

<style>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  font-family: cursive;
}

label {
  font-weight: bold;
}

input[type="file"] {
  width: 100%;
}

button {
  padding: 10px 20px;
  background-color: #a6d8f0;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
