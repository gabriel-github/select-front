import { Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import { AddUser } from "./components/AddUser";
import { UserSelect } from "./components/UserSelect";
import { api } from "./services/api";

interface User {
  _id: string;
  name: string;
  information: number[];
  created_at: Date;
}
interface UserFormatted {
  id: string;
  name: string;
  information: number[];
  created_at: Date;
}

function App() {
  const [users, setUsers] = useState<UserFormatted[]>([]);

  async function addNewUser(username: string) {
    const { data } = await api.post("/create", { name: username });

    const userFormatted = {
      id: data._id,
      name: data.name,
      information: data.information,
      created_at: data.created_at,
    };

    setUsers((oldState) => [...oldState, userFormatted]);
  }

  useEffect(() => {
    async function loadUsers() {
      const { data } = await api.get<User[]>("/");

      const dataFormatted = data.map((user) => ({
        id: user._id,
        name: user.name,
        information: user.information,
        created_at: user.created_at,
      }));

      setUsers(dataFormatted);
    }

    loadUsers();
  }, []);

  console.log(users);

  return (
    <Container maxWidth="md">
      <AddUser addNewUser={addNewUser} />
      {users.map((user) => (
        <UserSelect key={user.id} user={user} />
      ))}
    </Container>
  );
}

export default App;
