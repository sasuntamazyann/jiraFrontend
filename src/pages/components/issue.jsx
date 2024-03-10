import React, { useEffect } from 'react';
import { Button, Form, Input, Select } from 'antd';

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import TextArea from 'antd/es/input/TextArea';
import { createIssueThunk, updateIssueThunk } from '../../store/thunks/issue';
import { getProjectsIssueTypesThunk } from '../../store/thunks/projects';


const Issue = () => {
  const location = useLocation();
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isIssueCreated = useSelector((state) => {
    return state.issues.isCreated;
  })
  const isIssueUpdated = useSelector((state) => {
    return state.issues.isUpdated;
  })

  const types = useSelector((state) => {
    return state.projects.types;
  })


  const onFinish = (values) => {

    const data = {
      ...values,
      pid: location.state?.pid ? location.state?.pid : void 0,
      parent: location.state?.parent ? location.state?.parent : void 0,
    }
    const updateData = {
      ...values,
      pid: location.state.pid,
      id: id
    }


    id ? dispatch(updateIssueThunk(updateData)) : dispatch(createIssueThunk(data))
  };

  useEffect(() => {
    if (isIssueCreated || isIssueUpdated)
      navigate(-1)
  }, [isIssueCreated, isIssueUpdated])

  useEffect(() => {
    if (id)
      form.setFieldsValue({
        summary: location.state.summary,
        description: location.state.description

      });

  }, [id])

  useEffect(() => {

    dispatch(getProjectsIssueTypesThunk(location.state.pid));

  }, [])

  const selectTypes = location.state?.parent
    ? types
      ?.filter((t) => t.name === "Subtask")
      .map((t) => ({
        label: t.name,
        value: t.id
      }))
    : types
      ?.filter((t) => t.name !== "Subtask")
      .map((t) => ({
        label: t.name,
        value: t.id
      }));

  const onChange = (value) => {

  };

  return (
    <>
      <h2>{id ? "Update Issue" : "Create Issue"}</h2>
      <div className="buttons">
        <Button
          onClick={() => {
            navigate(-1)
          }}>Back to Issues</Button>

      </div>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexDirection: "column", justifyContent: "center" }}
        initialValues={{ remember: true }}
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Summary"
          name="summary"
          rules={[{ required: true, message: 'Please input summary!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input description!' }]}
        >
          <TextArea />
        </Form.Item>

        {!id && <Form.Item
          label="Types"
          name="type"
          rules={[{ required: true, message: 'Please select type!' }]}>

          <Select
            showSearch
            placeholder="Select a type"
            onChange={onChange}
            options={selectTypes}
          />

        </Form.Item>
        }
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {id ? "Update" : "Add Issue"}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Issue;