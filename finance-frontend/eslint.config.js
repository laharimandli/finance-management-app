import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  TextInput,
  Select,
  Badge
} from "@mantine/core";
import API from "./api";

export default function App() {
  const [data, setData] = useState([]);
  const [opened, setOpened] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    userName: "",
    type: "INCOME",
    category: "",
    amount: "",
    description: "",
    date: ""
  });

  // ✅ FIXED: fetchData inside useEffect (no ESLint warning)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/");
        setData(res.data);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchData();
  }, []);

  // CREATE / UPDATE
  const handleSubmit = async () => {
    try {
      if (editId) {
        await API.put(`/${editId}`, form);
      } else {
        await API.post("/", form);
      }

      setOpened(false);
      setEditId(null);

      setForm({
        userName: "",
        type: "INCOME",
        category: "",
        amount: "",
        description: "",
        date: ""
      });

      // refresh data
      const res = await API.get("/");
      setData(res.data);

    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await API.delete(`/${id}`);
        const res = await API.get("/");
        setData(res.data);
      } catch (err) {
        console.error("Delete Error:", err);
      }
    }
  };

  // EDIT
  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
    setOpened(true);
  };

  return (
    <div style={{ padding: 20 }}>
      <Button onClick={() => setOpened(true)}>Add Record</Button>

      {/* TABLE */}
      <Table striped highlightOnHover withTableBorder mt="md">
        <thead>
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.userName}</td>

                <td>
                  <Badge color={item.type === "INCOME" ? "green" : "red"}>
                    {item.type}
                  </Badge>
                </td>

                <td style={{ color: item.type === "INCOME" ? "green" : "red" }}>
                  ₹{item.amount}
                </td>

                <td>{item.date}</td>

                <td>
                  <Button size="xs" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>

                  <Button
                    size="xs"
                    color="red"
                    ml="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* MODAL */}
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          setEditId(null);
          setForm({
            userName: "",
            type: "INCOME",
            category: "",
            amount: "",
            description: "",
            date: ""
          });
        }}
        title={editId ? "Edit Record" : "Add Record"}
      >
        <TextInput
          label="User Name"
          value={form.userName}
          onChange={(e) =>
            setForm({ ...form, userName: e.target.value })
          }
        />

        <Select
          label="Type"
          data={["INCOME", "EXPENSE"]}
          value={form.type}
          onChange={(value) =>
            setForm({ ...form, type: value || "INCOME" })
          }
        />

        <TextInput
          label="Category"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <TextInput
          label="Amount"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
        />

        <TextInput
          label="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <TextInput
          label="Date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <Button mt="md" fullWidth onClick={handleSubmit}>
          {editId ? "Update" : "Submit"}
        </Button>
      </Modal>
    </div>
  );
}