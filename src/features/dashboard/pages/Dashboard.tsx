import { useAuth } from "../../../contexts/AuthContext";
import { ProfileView } from "./ProfileView";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <>
  <h1 className="text-3xl font-bold underline">Dashboard</h1>
  <ProfileView user={user}/>
  </>
);
}