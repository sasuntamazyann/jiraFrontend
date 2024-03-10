import { Space, Table} from 'antd';
import { Link } from 'react-router-dom';
import React, { useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';

import { getProjectsThunk } from '../../store/thunks/projects';

const columns = [
    {
        title: 'No',
        dataIndex: 'no',
        key: 'no',
        render: (_, __, index) => index+1,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Key',
        dataIndex: 'key',
        key: 'key',
    },      
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Link to={`/view/${record.id}`}>See Issues</Link>
            </Space>
        ),
    },
];

const ProjectsList = () => {
    const dispatch = useDispatch();
    const projectsList = useSelector((state)=>{
         return state.projects.projects;
    })
    useEffect(()=>{
        dispatch(getProjectsThunk())
    },[])

    return (
        <>
            <h2>Jira Projects List</h2>
            <Table columns={columns} dataSource={projectsList} />
        </>
    )
}


export default ProjectsList;