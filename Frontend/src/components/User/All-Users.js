import { useEffect, useState, useContext } from "react";
import UserList from "./User-List";
import AuthContext from "../../store/auth-context";

const AllUsers = () => {
  const [user, setUser] = useState("");
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;
  useEffect(() => {
    fetch(`http://localhost:8080/admin/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Fetching users failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData.user);
        setUser(resData.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <UserList obj={user} />;
};
export default AllUsers;
