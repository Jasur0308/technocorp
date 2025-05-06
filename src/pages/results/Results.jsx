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
        name: "Qanoatlantirilgan",
        visible: true,
    },
    {
        key: "2",
        name: "Tushuntirish berildi",
        visible: true,
    },
    {
        key: "3",
        name: "Arizasiga muvofiq ko'rib chiqilmadi",
        visible: true,
    },
    {
        key: "4",
        name: "Vakolatli organga yuborildi",
        visible: true,
    },
    {
        key: "5",
        name: "Anonim",
        visible: true,
    },
    {
        key: "6",
        name: "30 moddaga muvofiq koʻrilmagan",
        visible: true,
    },
];

const mask = (text) => "*".repeat(text.length/2);

const Results = () => {
    const [data, setData] = useState(initialData);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingResults, setEditingResults] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const toggleVisibility = (key) => {
        setData((prev) =>
            prev.map((item) =>
                item.key === key ? { ...item, visible: !item.visible } : item
            )
        );
    };

    const deleteResults = (key) => {
        Modal.confirm({
            title: "O‘chirishni tasdiqlaysizmi?",
            onOk: () => {
                setData((prev) => prev.filter((item) => item.key !== key));
            },
        });
    };

    const editResults = (record) => {
        form.setFieldsValue(record);
        setEditingResults(record);
        setIsModalVisible(true);
    };

    const openAddModal = () => {
        form.resetFields();
        setEditingResults(null);
        setIsModalVisible(true);
    };

    const onFinish = (values) => {
        if (editingResults) {
            setData((prev) =>
                prev.map((item) =>
                    item.key === editingResults.key
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
        setEditingResults(null);
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
                        onClick={() => editResults(record)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={
                            <VscTrash
                                style={{ color: "red", width: 30, height: 30 }}
                            />
                        }
                        onClick={() => deleteResults(record.key)}
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
                <h1 className="text-3xl text-gray-500">Natija</h1>
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
                    title={() => <h2 className="text-lg font-semibold text-gray-500">Manbalar jadvali</h2>}
                />

                <Modal
                    open={isModalVisible}
                    title={editingResults ? "Tahrirlash" : "Yangi natija qo‘shish"}
                    onCancel={() => {
                        setIsModalVisible(false);
                        form.resetFields();
                        setEditingResults(null);
                    }}
                    onOk={() => form.submit()}
                    okText={editingResults ? "Saqlash" : "Qo‘shish"}
                >
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            name="name"
                            label="Nomi"
                            rules={[{ required: true, message: "Natijani kiriting" }]}
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

export default Results;