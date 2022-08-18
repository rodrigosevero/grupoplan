import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditUser() {
  const navigate = useNavigate();

  const { id } = useParams()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [voltage, setVoltage] = useState("")
  const [brand, setBrand] = useState("")
  const [validationError, setValidationError] = useState({})

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    await axios.get(`http://localhost:8000/api/products/${id}`).then(({ data }) => {
      const { title, description, voltage, brand } = data.product
      setTitle(title)
      setDescription(description)
      setVoltage(voltage)
      setBrand(brand)
    }).catch(({ response: { data } }) => {
      Swal.fire({
        text: data.message,
        icon: "error"
      })
    })
  }


  const updateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('_method', 'PATCH');
    formData.append('title', title)
    formData.append('description', description)
    formData.append('voltage', voltage)
    formData.append('brand', brand)


    await axios.post(`http://localhost:8000/api/products/${id}`, formData).then(({ data }) => {
      Swal.fire({
        icon: "success",
        text: data.message
      })
      navigate("/")
    }).catch(({ response }) => {
      if (response.status === 422) {
        setValidationError(response.data.errors)
      } else {
        Swal.fire({
          text: response.data.message,
          icon: "error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update Product</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value]) => (
                                <li key={key}>{value}</li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={updateProduct}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Titulo</Form.Label>
                        <Form.Control type="text" value={title} onChange={(event) => {
                          setTitle(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="Description">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(event) => {
                          setDescription(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Voltage">
                        <Form.Label>Tensão</Form.Label>
                        <Form.Control type="text" value={voltage} onChange={(event) => {
                          setVoltage(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="Brand">
                        <Form.Label>Marca</Form.Label>
                        <Form.Select value={brand} aria-label="brand" onChange={(event) => {
                          setBrand(event.target.value)
                        }} >
                          <option></option>
                          <option value="Electrolux">Electrolux</option>
                          <option value="Brastemp">Brastemp</option>
                          <option value="Fischer">Fischer</option>
                          <option value="Samsung">Samsung</option>
                          <option value="LG">LG</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Salvar
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}