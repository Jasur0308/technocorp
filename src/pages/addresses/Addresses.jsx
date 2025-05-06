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
        location: "Navoiy viloyati, Navoiy shahri, Islom Karimov ko‘chasi, 3-A-uy",
        postal: "210100",
        phone: "+998 79 223 84 84",
        email: "navaiy@gis.uz",
        group: "Inspektor",
        visible: true,
    },
    {
        key: "2",
        location: "Andijon viloyati, Andijon shahri, Lermontov koʻchasi, 12- uy.",
        postal: "170121",
        phone: "+998 74 226 10 22",
        email: "andijan@gis.uz",
        group: "Inspektor",
        visible: true,
    },
    {
        key: "3",
        location: "Buxoro viloyati, Buxoro shahri, I.Moʻminov koʻchasi, 2А uy.",
        postal: "200100",
        phone: "+998 65 223 85 86",
        email: "bukhara@gis.uz",
        group: "Inspektor",
        visible: true,
    },
    {
        key: "4",
        location: "Jizzax viloyati, Jizzax shahri, Maʼrifat koʻchasi, 20 uy.",
        postal: "130114",
        phone: "998 72 226 57 88",
        email: "jizzakh@gis.uz",
        group: "Inspektor",
        visible: true,
    },
    {
        key: "5",
        location: "Samarqand viloyati, Samarqand shahri, Gagarin koʻchasi, 62 uy.",
        postal: "140103",
        phone: "998 66 234-76-13",
        email: "samarkand@gis.uz",
        group: "Inspektor",
        visible: true,
    },
];

const mask = (text) => "*".repeat(text.length/2);

const Addresses = () => {
    const [data, setData] = useState(initialData);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingAddresses, setEditingAddresses] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const toggleVisibility = (key) => {
        setData((prev) =>
            prev.map((item) =>
                item.key === key ? { ...item, visible: !item.visible } : { ...item }
            )
        );
    };

    const deleteAddresses = (key) => {
        Modal.confirm({
            title: "O‘chirishni tasdiqlaysizmi?",
            onOk: () => {
                setData((prev) => prev.filter((item) => item.key !== key));
            },
        });
    };

    const editAddresses = (record) => {
        form.setFieldsValue({
            ...record,
            visible: record.visible ?? true,
        });
        setEditingAddresses(record);
        setIsModalVisible(true);
    };

    const openAddModal = () => {
        form.resetFields();
        setEditingAddresses(null);
        setIsModalVisible(true);
    };

    const onFinish = (values) => {
        if (editingAddresses) {
            setData((prev) =>
                prev.map((item) =>
                    item.key === editingAddresses.key
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
        setEditingAddresses(null);
        form.resetFields();
    };

    const columns = [
        {
            title: "Manzil",
            dataIndex: "location",
            key: "location",
            render: (_, record) =>
                record.visible ? record.location : mask(record.location),
        },
        {
            title: "Pochta kodi",
            dataIndex: "postal",
            key: "postal",
            render: (_, record) =>
                record.visible ? record.postal : mask(record.postal),
        },
        {
            title: "Telefon raqami",
            dataIndex: "phone",
            key: "phone",
            render: (_, record) =>
                record.visible ? record.phone : mask(record.phone),
        },
        {
            title: "Elektron manzil",
            dataIndex: "email",
            key: "email",
            render: (_, record) =>
                record.visible ? record.email : mask(record.email),
        },
        {
            title: "Guruh nomi",
            dataIndex: "group",
            key: "group",
            render: (_, record) =>
                record.visible ? record.group : mask(record.group),
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
                        onClick={() => editAddresses(record)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={<VscTrash style={{ color: "red", width: 30, height: 30 }} />}
                        onClick={() => deleteAddresses(record.key)}
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
                <h1 className="text-3xl text-gray-500">Manzillar</h1>
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
                            Manzillar jadvali
                        </h2>
                    )}
                />

                <Modal
                    open={isModalVisible}
                    title={
                        editingAddresses
                            ? "Tahrirlash"
                            : "Yangi manzil qo‘shish"
                    }
                    onCancel={() => {
                        setIsModalVisible(false);
                        form.resetFields();
                        setEditingAddresses(null);
                    }}
                    onOk={() => form.submit()}
                    okText={editingAddresses ? "Saqlash" : "Qo‘shish"}
                >
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            name="location"
                            label="Manzil"
                            rules={[{ required: true, message: "Manzilni kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="postal"
                            label="Pochta kodi"
                            rules={[{ required: true, message: "Pochta kodini kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Telefon raqami"
                            rules={[{ required: true, message: "Telefon raqamini kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Elektron manzil"
                            rules={[{ required: true, message: "Elektron manzilni kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="group"
                            label="Guruh nomi"
                            rules={[{ required: true, message: "Guruh nomini kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Addresses;