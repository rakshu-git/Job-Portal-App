import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startDeleteAccount,
  startGetAdminDetails,
} from "../actions/userAction";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MyAccount() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(startGetAdminDetails());
  }, [dispatch]);

  const value = useSelector((state) => {
    return state.user.userData;
  });

  const deleteAcc = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleDelete = () => {
    dispatch(startDeleteAccount(deleteAcc));
  };
  return (
    <div>
      {value.map((ele) => (
        <Card key={ele.id} style={{ width: "18rem", margin: "20px" }}>
          <Card.Body>
            <Card.Title>{ele.username}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {ele.role}
            </Card.Subtitle>
            <Card.Text>
              <strong>Email:</strong> {ele.email}
              <br />
              <strong>Mobile:</strong> {ele.mobile}
            </Card.Text>
            <Button variant="danger" onClick={handleDelete}>
              Delete Account
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default MyAccount;
