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
        name: "O'rnatilgan tartibda ko'rib chiqib, murojaatchiga javob yo'llash uchun",
        condition: true,
        status: true,
    },
    {
        key: "2",
        name: "O'rnatilgan tartibda ko'rib chiqib, vakolatli organga va murojaatchiga javob yo'llash uchun",
        condition: false,
        status: true,
    },
];

const mask = (text) => "*".repeat(text.length/2);

const Resolutions = () => {
    const [data, setData] = useState(initialData);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingResolution, setEditingResolution] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const toggleCondition = (key) => {
        setData((prev) =>
            prev.map((item) =>
                item.key === key ? { ...item, condition: !item.condition } : item
            )
        );
    };

    const deleteResolution = (key) => {
        Modal.confirm({
            title: "O‘chirishni tasdiqlaysizmi?",
            onOk: () => {
                setData((prev) => prev.filter((item) => item.key !== key));
            },
        });
    };

    const editResolution = (record) => {
        form.setFieldsValue(record);
        setEditingResolution(record);
        setIsModalVisible(true);
    };

    const openAddModal = () => {
        form.resetFields();
        setEditingResolution(null);
        setIsModalVisible(true);
    };

    const onFinish = (values) => {
        if (editingResolution) {
            setData((prev) =>
                prev.map((item) =>
                    item.key === editingResolution.key ? { ...item, ...values } : item
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
        setEditingResolution(null);
        form.resetFields();
    };

    const columns = [
        {
            title: "Nomi",
            dataIndex: "name",
            key: "name",
            render: (_, record) =>
                record.condition ? record.name : mask(record.name),
        },
        {
            title: "Holati",
            key: "condition",
            render: (_, record) => (
                <span
                    style={{
                        color: record.condition ? "green" : "red",
                        fontWeight: 500,
                        fontSize: "18px",
                    }}
                >
                    {record.condition ? (
                        <BsCheckLg className="text-[30px]" />
                    ) : (
                        <GoX className="text-[30px]" />
                    )}
                </span>
            ),
        },
        {
            title: "Hudud status",
            key: "status",
            render: (_, record) => (
                <span
                    style={{
                        color: record.status ? "green" : "red",
                        fontWeight: 500,
                        fontSize: "18px",
                    }}
                >
                    {record.status ? (
                        <BsCheckLg className="text-[30px]" />
                    ) : (
                        <GoX className="text-[30px]" />
                    )}
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
                                    color: record.condition ? "#1890ff" : "gray",
                                    width: 30,
                                    height: 30,
                                }}
                            />
                        }
                        onClick={() => toggleCondition(record.key)}
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
                        onClick={() => editResolution(record)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={
                            <VscTrash style={{ color: "red", width: 30, height: 30 }} />
                        }
                        onClick={() => deleteResolution(record.key)}
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
                <h1 className="text-3xl text-gray-500">Rezolutsiyalar</h1>
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
                    title={() => (
                        <h2 className="text-lg font-semibold text-gray-500">
                            Rezolutsiyalar jadvali
                        </h2>
                    )}
                />

                <Modal
                    open={isModalVisible}
                    title={
                        editingResolution ? "Tahrirlash" : "Yangi rezolutsiya qo‘shish"
                    }
                    onCancel={() => {
                        setIsModalVisible(false);
                        form.resetFields();
                        setEditingResolution(null);
                    }}
                    onOk={() => form.submit()}
                    okText={editingResolution ? "Saqlash" : "Qo‘shish"}
                >
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            name="name"
                            label="Nomi"
                            rules={[
                                { required: true, message: "Rezolutsiyani kiriting" },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="condition"
                            label="Holati"
                            valuePropName="checked"
                        >
                            <Switch
                                checkedChildren="Faol"
                                unCheckedChildren="Nofaol"
                            />
                        </Form.Item>
                        <Form.Item
                            name="status"
                            label="Hudud statusi"
                            valuePropName="checked"
                        >
                            <Switch
                                checkedChildren="Faol"
                                unCheckedChildren="Nofaol"
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Resolutions;