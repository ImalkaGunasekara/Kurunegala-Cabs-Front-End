import { Col, Row, Form, Input, Button } from "antd"; // Added Button import
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { addCar, editCar, getAllCars } from "../redux/actions/carsActions";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

function EditCar() {
  const match = useLoaderData();
  const { cars } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  // Added missing state declarations
  const [car, setCar] = useState();
  const [totalCars, setTotalCars] = useState([]);
  const [file, setFile] = useState(null); // Added file state
  const [imageUrl, setImageUrl] = useState(""); // Added imageUrl state

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setTotalCars(cars);
      setCar(cars.find((o) => o._id === match));
      console.log(car);
    }
  }, [cars]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dqjsc82n2/image/upload",
        data
      );
      const { url } = uploadRes.data;
      setImageUrl(url);
    } catch (err) {
      console.log(err);
    }
  };

  const onFinish = async (values) => {
    values.bookedTimeSlots = [];
    values.image = imageUrl;

    dispatch(addCar(values));
    console.log(values);
  };

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className="p-2">
          {totalCars.length > 0 && (
            <Form
              initialValues={car}
              className="bs1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Car</h3>

              <hr />
              <Form.Item
                name="name"
                label="Car name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Upload Image" required>
                <input type="file" onChange={handleFileChange} />
                <Button type="primary" onClick={handleUpload}>
                  Upload Image
                </Button>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Car"
                    style={{ maxWidth: "200px", marginTop: "10px" }}
                  />
                )}
              </Form.Item>
              <Form.Item
                name="rentPerHour"
                label="Rent per hour"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="capacity"
                label="Capacity"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="fuelType"
                label="Fuel Type"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <div className="text-right">
                <button className="btn1">Edit CAR</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default EditCar;
