import { createContext, useContext, useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import AuthContext from "./auth-context";
import UserContext from "./user-context";
import { setLocale } from "yup";

const PostsContext = createContext({
  defectsList: [],
  addDefect: () => {},
  removeDefect: () => {},
});

export function PostsContextProvider(props) {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  const [defects, setDefects] = useState([]);
  const [projectPosts, setProjectPosts] = useState([]);

  useEffect(() => {
    if (authCtx.authState.userToken !== null) {
      getPostsFromServer();
      getDefectsFromServer();
    }
  }, [userCtx.currentProject, authCtx.authState]);

  function getPostsFromServer(setRefreshing) {
    setRefreshing ? setRefreshing(true) : null;
    if (
      authCtx.authState.userToken !== null &&
      userCtx.currentProject !== null
    ) {
      authCtx.axios
        .get(
          `posts?project=${userCtx.currentProject}&exclude=044b557d-caf4-4020-9804-a472e247c928` //Exclude Defects
        )
        .then(function (response) {
          // handle success
          console.log("NewPostData");
          var posts = response.data;
          posts.sort(function (a, b) {
            var d1 = new Date(a);
            var d2 = new Date(b);
            return d1.getTime() >= d2.getTime() ? 1 : -1;
          });
          setProjectPosts(posts);
          setRefreshing ? setRefreshing(false) : null;
        })
        .catch(function (error) {
          // handle error
          setRefreshing ? setRefreshing(false) : null;
          console.log(error);
        });
    } else {
      setRefreshing ? setRefreshing(false) : null;
      console.log("Usertoken ist null!!");
    }
  }
  function getDefectsFromServer(setRefreshing) {
    setRefreshing ? setRefreshing(true) : null;
    if (authCtx.authState.userToken !== null) {
      authCtx.axios
        .get(
          `posts?project=${userCtx.currentProject}&categories=044b557d-caf4-4020-9804-a472e247c928` //Only include Defects
        )
        .then(function (response) {
          // handle success
          var posts = response.data;
          var defects = [];
          for (var post of posts) {
            if (post.categories[1]) {
              post.categories[1].name === "Defect" ? defects.push(post) : null;
            }
          }
          setRefreshing ? setRefreshing(false) : null;
          setDefects(defects);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          setRefreshing ? setRefreshing(false) : null;
        });
    } else {
      console.log("Usertoken ist null!!");
    }
  }

  function handleAddDefect(post) {
    if (authCtx.authState.userToken !== null) {
      authCtx.axios
        .post("posts", {
          content: post.content,
          creatorID: userCtx.id,
          projectID: userCtx.currentProject,
          impact: post.impact,
          date: post.date,
          status: post.status,
          category_ids: [
            post.categories,
            "044b557d-caf4-4020-9804-a472e247c928", // DEFECT
          ],
        })
        .then(function (response) {
          // handle success
          var postid = response.data.id;
          var counter = 0;
          for (var image of post.media) {
            counter++;
            var random = Math.trunc(Math.random() * (1000 - 0 + 1));
            var filename = postid + random + ".jpg";
            postMediaToServer(
              postid,
              image.image,
              filename,
              counter == post.media.length ? getPostsFromServer() : null
            );
          }
          getDefectsFromServer();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } else {
      console.log("Usertoken ist null!!");
    }
  }
  function handleAddUserPost(post) {
    if (authCtx.authState.userToken !== null) {
      authCtx.axios
        .post("posts", {
          content: post.content,
          creatorID: userCtx.id,
          projectID: userCtx.currentProject,
          category_ids: [post.category],
          title: post.title,
          date: post.date,
        })
        .then(function (response) {
          // handle success
          var postid = response.data.id;
          var counter = 0;
          for (var image of post.media) {
            counter++;
            var random = Math.trunc(Math.random() * (1000 - 0 + 1));
            var filename = postid + random + ".jpg";
            postMediaToServer(
              postid,
              image.image,
              filename,
              counter == post.media.length > 0 ? getPostsFromServer() : null
            );
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(() => {
          //getPostsFromServer();
        });
    } else {
      console.log("Usertoken ist null!!");
    }
  }
  async function postMediaToServer(id, media, filename, success) {
    console.log(media);
    if (authCtx.authState.userToken !== null) {
      const formData = new FormData();
      formData.append("post_id", id);
      //media.type = "image/jpeg";
      formData.append("file", {
        uri: media.uri,
        type: "image/jpeg",
        name: filename,
      });
      fetch("http://vserver.heinrichs.tech:8000/api/v1/files", {
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authCtx.authState.userToken}`,
        },
        body: formData,
      })
        .then((response) => {
          console.log("image uploaded");
          console.log(response.status);
          success ? success() : null;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Usertoken ist null!!");
    }
  }
  async function handleSaveImages(media, filename) {
    //Download the file to local app storage
    console.log(media);
    const fileUri = `${FileSystem.documentDirectory}${filename}`;
    const downloadedFile = await FileSystem.downloadAsync(media.url, fileUri);

    if (downloadedFile.status != 200) {
      console.log("Error downloading the image");
    }

    const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY); //await MediaLibrary.getPermissionsAsync();
    if (perm.status != "granted") {
      return;
    }
    try {
      const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
      const album = await MediaLibrary.getAlbumAsync("Brckflw");
      if (album == null) {
        await MediaLibrary.createAlbumAsync("Brckflw", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    } catch (e) {
      handleError(e);
    }
  }

  const context = {
    posts: projectPosts,
    defects: defects,
    addPost: handleAddUserPost,
    saveImages: handleSaveImages,
    addDefect: handleAddDefect,
    postMedia: postMediaToServer,
    getPostsFromServer: getPostsFromServer,
    getDefectsFromServer: getDefectsFromServer,
  };

  return (
    <PostsContext.Provider value={context}>
      {props.children}
    </PostsContext.Provider>
  );
}
export default PostsContext;
