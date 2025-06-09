import { Field, Form, FormikProvider, useFormik } from "formik"
import { Col, Container, Row } from "react-bootstrap";

const StudyDetails2 = () => {

    const formik = useFormik({
        initialValues: {
            classNo: '',
            school: '',
            hallTicket: '',
            yearOfPass: '',
            percentage: '',
        }
    })
    return (
        <>
            <FormikProvider value={formik}>
                <Form onChange={formik.handleChange} onSubmit={formik.handleSubmit}>
                    <Container className='outer-page-content-container'>
                        <div className="head d-flex align-items-center border mt-4">
                            <h5>Study Details</h5>
                        </div>

                        <Row className="px-4 pt-4">
                            <Col xs={12} sm={12} md={12} lg={3} xl={3} xxl={3}>
                            <span> Study Type</span>
                            <Field>

                            </Field>

                            </Col>
                        </Row>

                    </Container>

                </Form>

            </FormikProvider>
        </>
    )
}

export default StudyDetails2;