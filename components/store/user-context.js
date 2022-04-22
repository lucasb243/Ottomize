import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AuthContext from "./auth-context";

const UserContext = createContext({});

export function UserContextProvider(props) {
  const authCtx = useContext(AuthContext);
  const [userId, setUserId] = useState(-1);
  const [userName, setUserName] = useState("");
  const [userIcon, setUserIcon] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
  );
  const [userEmail, setUserEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");
  const [access_registers, setAccess_Registers] = useState([]);

  const [userIsBuilder, setUserIsBuilder] = useState(false);
  const [userProjects, setUserProjects] = useState([]);
  const [defaultProject, setDefaultProject] = useState("");
  const [currentProject, setCurrentProject] = useState(
    "0f33abb7-74d6-489f-9190-ee9630f193cf"
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    //initialize user from server
    if (authCtx.authState.userToken !== null) {
      authCtx.axios
        .get("users/me")
        .then(function (response) {
          // handle success
          const { email, id, first_name, last_name, access_registers, pic } =
            response.data;
          setUserEmail(email);
          setUserId(id);
          setUserName(email);
          setFirstName(first_name);
          setLastName(last_name);
          setFullName(first_name + " " + last_name);
          setAccess_Registers(access_registers);
          pic ? setUserIcon(pic) : null;
          //console.log(userProjects);
          //test
          //setDefaultProject(userProjects[0]);
          //TODO setUserIcon()
          getCategoriesFromServer();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }, [authCtx.authState]);

  function handleAddProjects(projects) {
    setUserProjects((prevUserProjects) => {
      return prevUserProjects.concat(projects);
    });
  }

  function convertDateTimeToFormat(datetime) {
    var dateString = "";
    var dateHelper = datetime.slice(0, 10);
    var day = dateHelper.slice(8, 10);
    var mon = dateHelper.slice(5, 7);
    var year = dateHelper.slice(0, 4);
    dateString = `${day}.${mon}.${year}`;

    return dateString;
  }

  function getCategoriesFromServer() {
    if (authCtx.authState.userToken !== null) {
      authCtx.axios
        .get("categories")
        .then(function (response) {
          // handle success
          var categories = [];
          for (var cat of response.data) {
            const { id, name } = cat;
            categories.push({ id, name });
          }
          setCategories(categories);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } else {
      console.log("Usertoken ist null!!");
    }
  }

  function changeUserisBuilderHandler(isBuilder) {
    setUserIsBuilder(isBuilder);
  }
  function changeUserIdHandler(userId) {
    setUserId(userId);
  }
  function changeUserNameHandler(userName) {
    setUserName(userName);
  }
  function changeIconHandler(iconUrl) {
    setUserIcon(iconUrl);
  }
  function changeIsBuilderHandler(iconUrl) {
    setUserIcon(iconUrl);
  }
  function addProjectHandler(projectKey) {
    setUserProjects((prevUserProjects) => {
      return prevUserProjects.concat(projectKey);
    });
  }
  function removeProjectHandler(projectKey) {
    setUserProjects((prevUserProjects) => {
      return prevUserProjects.filter((project) => project !== projectKey);
    });
  }
  function changeEmailHandler({ email }) {
    if (authCtx.authState.userToken !== null) {
      authCtx.axios
        .put(`users/${userId}`, { email: email })
        .then(function (response) {
          // handle success
          setUserEmail(response.email);
          console.log("Email successfully changed!");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } else {
      console.log("Usertoken ist null!!");
    }
  }
  function changePasswordHandler(password) {
    if (authCtx.authState.userToken !== null) {
      authCtx.axios
        .put(`users/${userId}`, { email: userEmail, password: password })
        .then(function (response) {
          // handle success
          console.log("Password successfully changed!");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } else {
      console.log("Usertoken ist null!!");
    }
  }

  function addProjectHandler(prjKey) {
    if (authCtx.authState.userToken !== null) {
      authCtx.axios
        .post(`accessRegister`, { project_key_string: prjKey, user_id: userId })
        .then(function (response) {
          // handle success
          setUserProjects((prevUserProjects) => {
            return prevUserProjects.concat(response.project_id);
          });
          console.log("Project successfully added!");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } else {
      console.log("Usertoken ist null!!");
    }
  }

  async function postUserIconToServer(media, filename, success) {
    if (authCtx.authState.userToken !== null) {
      const formData = new FormData();
      console.log(userId);
      formData.append("user", userId);
      //media.type = "image/jpeg";
      console.log(media.image.uri);
      console.log(filename);
      formData.append("file", {
        uri: media.image.uri,
        type: "image/jpeg",
        name: filename,
      });
      fetch(`http://vserver.heinrichs.tech:8000/api/v1/users/${userId}/pic`, {
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authCtx.authState.userToken}`,
        },
        body: formData,
      })
        .then((response) => {
          /* console.log("response:");
          console.log(response);
          console.log("response.data:");
          console.log(response.data);
          console.log("image uploaded");
          console.log(response.status); */
          success ? success() : null;
          setUserIcon(response.pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Usertoken ist null!!");
    }
  }

  const context = {
    id: userId,
    name: userName,
    icon: userIcon,
    email: userEmail,
    isBuilder: userIsBuilder,
    projects: userProjects,
    defaultProject: defaultProject,
    currentProject: currentProject,
    categories: categories,
    firstName: firstName,
    lastName: lastName,
    fullName: fullName,
    access_registers: access_registers,
    setCurrentProject: setCurrentProject,
    postUserIconToServer: postUserIconToServer,
    changeUserisBuilder: changeUserisBuilderHandler,
    changeUserId: changeUserIdHandler,
    changeEmail: changeEmailHandler,
    changeUserName: changeUserNameHandler,
    changePassword: changePasswordHandler,
    changeIcon: setUserIcon,
    addProject: addProjectHandler,
    convertDateTimeToFormat: convertDateTimeToFormat,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}
export default UserContext;
