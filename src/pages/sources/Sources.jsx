import { BsCheckLg } from "react-icons/bs";
import { GoX } from "react-icons/go";
import { BiPlusMedical } from "react-icons/bi";
import { VscTrash } from "react-icons/vsc";
import { FaEdit } from "react-icons/fa";
import { ImEye } from "react-icons/im";
import { Table, Button, Space, Modal, Form, Input, Divider, Switch } from "antd";
import React, { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const initialData = [
    {
        key: "1",
        name: "1144 ishonch telefoni orqali",
        code: "CC",
        visible: true,
    },
    {
        key: "2",
        name: "Ommaviy Axborot Vositalari orqali",
        code: "OA",
        visible: true,
    },
];

const mask = (text) => "*".repeat(text.length/2);

const Sources = () => {
    const [data, setData] = useState(initialData);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editing, setEditing] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const toggleVisibility = (key) => {
        setData((prev) =>
            prev.map((item) =>
                item.key === key ? { ...item, visible: !item.visible } : item
            )
        );
    };

    const deleteAdmin = (key) => {
        Modal.confirm({
            title: "O‘chirishni tasdiqlaysizmi?",
            onOk: () => {
                setData((prev) => prev.filter((item) => item.key !== key));
            },
        });
    };

    const edit = (record) => {
        form.setFieldsValue(record);
        setEditing(record);
        setIsModalVisible(true);
    };

    const openAddModal = () => {
        form.resetFields();
        setEditing(null);
        setIsModalVisible(true);
    };

    const onFinish = (values) => {
        if (editing) {
            setData((prev) =>
                prev.map((item) =>
                    item.key === editing.key
                        ? { ...item, ...values }
                        : item
                )
            );
        } else {
            const newItem = {
                key: Date.now().toString(),
                ...values,
            };
            setData((prev) => [newItem, ...prev]);
        }
        setIsModalVisible(false);
        setEditing(null);
        form.resetFields();
    };

    const columns = [
        {
            title: "Nomi",
            dataIndex: "name",
            key: "name",
            render: (_, record) =>
                record.visible ? record.name : mask(record.name),
        },
        {
            title: "Kod",
            dataIndex: "code",
            key: "code",
            render: (_, record) =>
                record.visible ? record.code : mask(record.code),
        },
        {
            title: "Holati",
            key: "condition",
            render: (_, record) => (
                <span
                    style={{
                        color: record.visible ? "green" : "red",
                        fontWeight: 500,
                        fontSize: "18px",
                    }}
                >
                    {record.visible ? <BsCheckLg className="text-[30px]" /> : <GoX className="text-[30px]" />}
                </span>
            ),
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
                        onClick={() => edit(record)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={
                            <VscTrash
                                style={{ color: "red", width: 30, height: 30 }}
                            />
                        }
                        onClick={() => deleteAdmin(record.key)}
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
                <h1 className="text-3xl text-gray-500">Manbalar</h1>
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
                    title={() => <h2 className="text-lg font-semibold text-gray-500">Manbalar jadvali</h2>}
                />

                <Modal
                    open={isModalVisible}
                    title={editing ? "Tahrirlash" : "Yangi manba qo‘shish"}
                    onCancel={() => {
                        setIsModalVisible(false);
                        form.resetFields();
                        setEditing(null);
                    }}
                    onOk={() => form.submit()}
                    okText={editing ? "Saqlash" : "Qo‘shish"}
                >
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            name="name"
                            label="Nomi"
                            rules={[{ required: true, message: "Nomi" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            label="Kod"
                            rules={[{ required: true, message: "Kod" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="visible"
                            label="Holati"
                            valuePropName="checked"
                        >
                            <Switch checkedChildren="Faol" unCheckedChildren="Nofaol" />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Sources;