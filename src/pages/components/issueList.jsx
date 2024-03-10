import React, { useEffect, useState } from 'react';
import { Button, Modal, Space, Table, Tag } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteIssueThunk, getIssuesThunk } from '../../store/thunks/issue';
import moment from 'moment';

const IssuesList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const issuesList = useSelector((state) => {
        return state.issues.issues
    })
    const isIssueDeleted = useSelector((state) => {
        return state.issues.isDeleted
    })
    useEffect(() => {
        dispatch(getIssuesThunk(id));
       

    }, [])
    useEffect(() => {
        if(isIssueDeleted)
        dispatch(getIssuesThunk(id));

    }, [isIssueDeleted])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ids, setIds] = useState({});

    const showModal = (paramIds) => {
        setIds(paramIds)
        setIsModalOpen(true);
    };

    const handleOk = () => {
        dispatch(deleteIssueThunk({ id:ids.id, pid:ids.pid }))
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };



    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Summary',
            dataIndex: 'summary',
            key: 'summary',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Type',
            key: 'type',
            render: (_, record) => { return record?.type?.name }
        },
        {
            title: 'Created',
            key: 'created',
            render: (_, record) => { return moment(record?.created_at).format('MMMM Do YYYY, h:mm:ss a') }
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (                
                <Space size="middle">
                    {record.type.name==="Task" &&  <Button onClick={() => {
                        navigate(`/create`, { state: { parent:record.id, pid: record.project_id } })
                    }}> Create Sub Issue</Button>}
                    <Button onClick={() => {
                        navigate(`/edit/${record.id}`, { state: { summary: record.summary, description: record.description, pid: record.project_id } })
                    }}> Edit Issue</Button>
                    <Button onClick={()=>{showModal({id:record.id,pid: record.project_id})}}>
                        Delete Issue</Button>


                </Space>
            ),
        },
    ];
    return (
        <>
            <h2>Issues List</h2>
            <div className="buttons">
                <Button
                    onClick={() => {
                        navigate("/")
                    }}>Back to projects</Button>
                <Button
                    onClick={() => {
                        navigate("/create", { state: { pid: id } })
                    }}>Create Issue</Button>
            </div>
            <Table columns={columns} dataSource={issuesList.data} />
            <Modal
             title="Are you sure to delete issue?"
              open={isModalOpen} 
              onOk={handleOk} 
              onCancel={handleCancel}>             
                
            </Modal>
        </>
    )
}

export default IssuesList;