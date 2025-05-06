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
        Name: "Toshkent shahar hududiy operator",
        position: "Bosh operator",
        code: "TSHHO-3",
        createdAt: "2020-10-11 08:36:10",
        visible: true,
    },
    {
        key: "2",
        Name: "1144 Operatori",
        position: "Bosh operator",
        code: "TSH-1144",
        createdAt: "2020-10-11 08:36:10",
        visible: true,
    },
    {
        key: "3",
        Name: "Andijon hududiy",
        position: "Bosh mutaxassis",
        code: "ANBM-11",
        createdAt: "2020-10-11 08:36:10",
        visible: true,
    },
    {
        key: "4",
        Name: "Jizzax hududiy",
        position: "Bosh mutaxassis",
        code: "JIBM-13",
        createdAt: "2020-10-11 08:36:10",
        visible: true,
    },
    {
        key: "5",
        Name: "Farg'ona hududiy",
        position: "Bosh mutaxassis",
        code: "FABM-20",
        createdAt: "2020-10-11 08:36:10",
        visible: true,
    },
];

const mask = (text) => "*".repeat(text.length/2);

const OperatorGroups = () => {
    const [data, setData] = useState(initialData);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingOperatorGroups, setEditingOperatorGroups] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const toggleVisibility = (key) => {
        setData((prev) =>
            prev.map((item) =>
                item.key === key ? { ...item, visible: !item.visible } : { ...item }
            )
        );
    };

    const deleteOperatorGroups = (key) => {
        Modal.confirm({
            title: "O‘chirishni tasdiqlaysizmi?",
            onOk: () => {
                setData((prev) => prev.filter((item) => item.key !== key));
            },
        });
    };

    const editOperatorGroups = (record) => {
        form.setFieldsValue({
            ...record,
            visible: record.visible ?? true,
        });
        setEditingOperatorGroups(record);
        setIsModalVisible(true);
    };

    const openAddModal = () => {
        form.resetFields();
        setEditingOperatorGroups(null);
        setIsModalVisible(true);
    };

    const onFinish = (values) => {
        if (editingOperatorGroups) {
            setData((prev) =>
                prev.map((item) =>
                    item.key === editingOperatorGroups.key
                        ? {
                            ...item,
                            Name: values.Name,
                            position: values.position,
                            code: values.code,
                        }
                        : item
                )
            );
        } else {
            const newItem = {
                key: Date.now().toString(),
                createdAt: new Date().toLocaleString(),
                visible: true,
                ...values,
            };
            setData((prev) => [newItem, ...prev]);
        }

        setIsModalVisible(false);
        setEditingOperatorGroups(null);
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
            title: "Lavozim",
            dataIndex: "position",
            key: "position",
            render: (_, record) =>
                record.visible ? record.position : mask(record.position),
        },
        {
            title: "Kod",
            dataIndex: "code",
            key: "code",
            render: (_, record) =>
                record.visible ? record.code : mask(record.code),
        },
        {
            title: "Yaratish sanasi",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (_, record) =>
                record.visible ? record.createdAt : mask(record.createdAt),
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
                        onClick={() => editOperatorGroups(record)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={<VscTrash style={{ color: "red", width: 30, height: 30 }} />}
                        onClick={() => deleteOperatorGroups(record.key)}
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
                <h1 className="text-3xl text-gray-500">Operatorlar guruhi</h1>
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
                            Operatorlar guruhi jadvali
                        </h2>
                    )}
                />

                <Modal
                    open={isModalVisible}
                    title={
                        editingOperatorGroups
                            ? "Tahrirlash"
                            : "Yangi operator guruh qo‘shish"
                    }
                    onCancel={() => {
                        setIsModalVisible(false);
                        form.resetFields();
                        setEditingOperatorGroups(null);
                    }}
                    onOk={() => form.submit()}
                    okText={editingOperatorGroups ? "Saqlash" : "Qo‘shish"}
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
                            name="position"
                            label="Lavozim"
                            rules={[{ required: true, message: "Lavozimni kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            label="Kod"
                            rules={[{ required: true, message: "Kodni kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default OperatorGroups;