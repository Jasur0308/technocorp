import React, { useState } from "react";
import { BiPlusMedical } from "react-icons/bi";
import { VscTrash } from "react-icons/vsc";
import { FaEdit } from "react-icons/fa";
import { ImEye } from "react-icons/im";
import { Table, Button, Space, Modal, Form, Input, Divider} from "antd";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const initialData = [
    {
        key: "1",
        Name: "Mualliflik huquqi bo'limi",
        code: "MHB-1",
        group: "department",
        position: "Boshliq",
        visible: true,
    },
    {
        key: "2",
        Name: "Radioaloqa bo'limi",
        code: "RA-1",
        group: "department",
        position: "Boshliq",
        visible: true,
    },
    {
        key: "3",
        Name: "Axborot xavfsizligi bo'limi",
        code: "AXB-1",
        group: "department",
        position: "Boshliq",
        visible: true,
    },
    {
        key: "4",
        Name: "Ma'lumotlarni uzatish bo'limi",
        code: "MUB-1",
        group: "department",
        position: "Boshliq",
        visible: true,
    },
    {
        key: "5",
        Name: "Sirdaryo viloyati hududiy inspeksiyasi",
        code: "SirVHI-1",
        group: "inspection	",
        position: "Boshliq",
        visible: true,
    },
];

const mask = (text) => "*".repeat(text.length/2);

const ExecutorGroups = () => {
    const [data, setData] = useState(initialData);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingExecutorGroups, setEditingExecutorGroups] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const toggleVisibility = (key) => {
        setData((prev) =>
            prev.map((item) =>
                item.key === key ? { ...item, visible: !item.visible } : { ...item }
            )
        );
    };

    const deleteExecutorGroups = (key) => {
        Modal.confirm({
            title: "O‘chirishni tasdiqlaysizmi?",
            onOk: () => {
                setData((prev) => prev.filter((item) => item.key !== key));
            },
        });
    };

    const editExecutorGroups = (record) => {
        form.setFieldsValue({
            ...record,
            visible: record.visible ?? true,
        });
        setEditingExecutorGroups(record);
        setIsModalVisible(true);
    };

    const openAddModal = () => {
        form.resetFields();
        setEditingExecutorGroups(null);
        setIsModalVisible(true);
    };

    const onFinish = (values) => {
        if (editingExecutorGroups) {
            setData((prev) =>
                prev.map((item) =>
                    item.key === editingExecutorGroups.key
                        ? {
                            ...item,
                            Name: values.Name,
                            code: values.code,
                            group: values.group,
                            position: values.position,
                        }
                        : item
                )
            );
        } else {
            const newItem = {
                visible: true,
                ...values,
            };
            setData((prev) => [newItem, ...prev]);
        }

        setIsModalVisible(false);
        setEditingExecutorGroups(null);
        form.resetFields();
    };

    const columns = [
        {
            title: "Nomi",
            dataIndex: "Name",
            key: "Name",
            render: (_, record) =>
                record.visible ? record.Name : mask(record.Name),
        },
        {
            title: "Nom URL kodi",
            dataIndex: "code",
            key: "code",
            render: (_, record) =>
                record.visible ? record.code : mask(record.code),
        },
        {
            title: "Guruh",
            dataIndex: "group",
            key: "group",
            render: (_, record) =>
                record.visible ? record.group : mask(record.group),
        },
        {
            title: "Lavozim",
            dataIndex: "position",
            key: "position",
            render: (_, record) =>
                record.visible ? record.position : mask(record.position),
        },
        {
            title: "Harakat",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={
                            <ImEye
                                style={{
                                    color: record.visible ? "#1890ff" : "gray",
                                    width: 30,
                                    height: 30,
                                }}
                            />
                        }
                        onClick={() => toggleVisibility(record.key)}
                    />
                    <Button
                        type="text"
                        icon={
                            <FaEdit
                                style={{
                                    color: "#faad14",
                                    width: 30,
                                    height: 30,
                                }}
                            />
                        }
                        onClick={() => editExecutorGroups(record)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={<VscTrash style={{ color: "red", width: 30, height: 30 }} />}
                        onClick={() => deleteExecutorGroups(record.key)}
                    />
                </Space>
            ),
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Breadcrumbs />
            <div className="p-6">
                <h1 className="text-3xl text-gray-500">Ijrochilar guruhi</h1>
                <Divider />
                <div style={{ textAlign: "right", marginBottom: 16 }}>
                    <Button type="primary" onClick={openAddModal}>
                        <BiPlusMedical />
                        Qo‘shish
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    rowSelection={rowSelection}
                    pagination={false}
                    bordered
                    title={() => (
                        <h2 className="text-lg font-semibold text-gray-500">
                            Ijrochilar guruhi jadvali
                        </h2>
                    )}
                />

                <Modal
                    open={isModalVisible}
                    title={
                        editingExecutorGroups
                            ? "Tahrirlash"
                            : "Yangi ijrochilar guruh qo‘shish"
                    }
                    onCancel={() => {
                        setIsModalVisible(false);
                        form.resetFields();
                        setEditingExecutorGroups(null);
                    }}
                    onOk={() => form.submit()}
                    okText={editingExecutorGroups ? "Saqlash" : "Qo‘shish"}
                >
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            name="Name"
                            label="Nomi"
                            rules={[{ required: true, message: "Nomni kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            label="URL kod"
                            rules={[{ required: true, message: "URL kodni kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="group"
                            label="Guruh"
                            rules={[{ required: true, message: "Guruhni kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="position"
                            label="Lavozim"
                            rules={[{ required: true, message: "Lavozimni kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default ExecutorGroups;