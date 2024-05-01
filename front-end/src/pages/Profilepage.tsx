import Profile from "../components/Profile";
import { useParams } from "react-router-dom";

const UserProfilePage = () => {
  const id = useParams();
  // const userId = id.toString();
  // return <Profile userId={userId} />;
  return <Profile userId={id} />;
};

export default UserProfilePage;
