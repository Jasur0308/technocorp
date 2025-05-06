import React, { useState } from "react";
import { BiPlusMedical } from "react-icons/bi";
import { VscTrash } from "react-icons/vsc";
import { FaEdit } from "react-icons/fa";
import { ImEye } from "react-icons/im";
import { Table, Button, Space, Modal, Form, Input, Divider } from "antd";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const initialData = [
    {
        key: "1",
        fullName: "Dildora A'layeva",
        email: "d.alaeva@gis.uz",
        phone: "71 202-69-86",
        region: "O'zkamnorat",
        position: "Murojaatlar bilan ishlash bo'limi ( Boshliq )",
        visible: true,
    },
    {
        key: "2",
        fullName: "Sardor Soibnazarov",
        email: "teleradio@gis.uz",
        phone: "90 981-32-12",
        region: "O'zkamnorat",
        position: "Teleradioeshittirish bo'limi ( Boshliq )",
        visible: true,
    },
    {
        key: "3",
        fullName: "Hamidulla Xolmuxamedov",
        email: "soft@gis.uz",
        phone: "93 502-22-23",
        region: "O'zkamnorat",
        position: "Mualliflik huquqi bo'limi ( Boshliq )",
        visible: true,
    },
    {
        key: "4",
        fullName: "Rustam Baltayev - Deactivated",
        email: "r.baltaev@gis.uz",
        phone: "71 202-69-88",
        region: "O'zkomnazorat",
        position: "Axborot texnologiyalari sohasida nazorat qilish bo‘limi ( Boshliq )",
        visible: true,
    },
    {
        key: "5",
        fullName: "Abdurasul Tulaganov",
        email: "radioaloqa@gis.uz",
        phone: "71 202-69-63",
        region: "O'zkomnazorat",
        position: "Radioaloqa bo'limi ( Boshliq )",
        visible: true,
    },
];

const mask = (text) => "*".repeat(text.length/2);

const Executors = () => {
    const [data, setData] = useState(initialData);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingExecutors, setEditingExecutors] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [filters, setFilters] = useState({
        fullName: "",
        email: "",
        phone: "",
        region: ""
    });

    const handleFilterChange = (e, field) => {
        const value = e.target.value;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [field]: value,
        }));
    };

    const filteredData = data.filter((operator) => {
        return (
            operator.fullName.toLowerCase().includes(filters.fullName.toLowerCase()) &&
            operator.email.toLowerCase().includes(filters.email.toLowerCase()) &&
            operator.phone.toLowerCase().includes(filters.phone.toLowerCase()) &&
            operator.region.toLowerCase().includes(filters.region.toLowerCase())
        );
    });

    const toggleVisibility = (key) => {
        setData((prev) =>
            prev.map((item) =>
                item.key === key ? { ...item, visible: !item.visible } : { ...item }
            )
        );
    };

    const deleteExecutors = (key) => {
        Modal.confirm({
            title: "O‘chirishni tasdiqlaysizmi?",
            onOk: () => {
                setData((prev) => prev.filter((item) => item.key !== key));
            },
        });
    };

    const editExecutors = (record) => {
        form.setFieldsValue({
            ...record,
            visible: record.visible ?? true,
        });
        setEditingExecutors(record);
        setIsModalVisible(true);
    };

    const openAddModal = () => {
        form.resetFields();
        setEditingExecutors(null);
        setIsModalVisible(true);
    };

    const onFinish = (values) => {
        if (editingExecutors) {
            setData((prev) =>
                prev.map((item) =>
                    item.key === editingExecutors.key
                        ? {
                            ...item,
                            ...values,
                        }
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
        setEditingExecutors(null);
        form.resetFields();
    };

    const columns = [
        {
            title: "To'liq ismi",
            dataIndex: "fullName",
            key: "fullName",
            render: (_, record) =>
                record.visible ? record.fullName : mask(record.fullName),
        },
        {
            title: "Elektron pochta",
            dataIndex: "email",
            key: "email",
            render: (_, record) =>
                record.visible ? record.email : mask(record.email),
        },
        {
            title: "Telefon",
            dataIndex: "phone",
            key: "phone",
            render: (_, record) =>
                record.visible ? record.phone : mask(record.phone),
        },
        {
            title: "Viloyat",
            dataIndex: "region",
            key: "region",
            render: (_, record) =>
                record.visible ? record.region : mask(record.region),
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
                        onClick={() => editExecutors(record)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={
                            <VscTrash style={{ color: "red", width: 30, height: 30 }} />
                        }
                        onClick={() => deleteExecutors(record.key)}
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
                <h1 className="text-3xl text-gray-500">Ijrochilar</h1>
                <Divider />
                <div style={{ marginBottom: 16 }}>
                    <Input
                        placeholder="To'liq ismi"
                        value={filters.fullName}
                        onChange={(e) => handleFilterChange(e, "fullName")}
                        style={{ marginRight: 8, width: 200 }}
                    />
                    <Input
                        placeholder="Elektron manzil"
                        value={filters.email}
                        onChange={(e) => handleFilterChange(e, "email")}
                        style={{ marginRight: 8, width: 200 }}
                    />
                    <Input
                        placeholder="Telefon"
                        value={filters.phone}
                        onChange={(e) => handleFilterChange(e, "phone")}
                        style={{ marginRight: 8, width: 200 }}
                    />
                    <Input
                        placeholder="Viloyat"
                        value={filters.region}
                        onChange={(e) => handleFilterChange(e, "region")}
                        style={{ marginRight: 8, width: 200 }}
                    />
                </div>
                <div style={{ textAlign: "right", marginBottom: 16 }}>
                    <Button type="primary" onClick={openAddModal}>
                        <BiPlusMedical />
                        Qo‘shish
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowSelection={rowSelection}
                    pagination={false}
                    bordered
                    title={() => (
                        <h2 className="text-lg font-semibold text-gray-500">
                            Ijrochilar jadvali
                        </h2>
                    )}
                />

                <Modal
                    open={isModalVisible}
                    title={editingExecutors ? "Tahrirlash" : "Yangi ijrochi qo‘shish"}
                    onCancel={() => {
                        setIsModalVisible(true);
                        form.resetFields();
                        setEditingExecutors(null);
                    }}
                    onOk={() => form.submit()}
                    okText={editingExecutors ? "Saqlash" : "Qo‘shish"}
                >
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            name="fullName"
                            label="Ism"
                            rules={[{ required: true, message: "To'liq ismni kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: "Emailni kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Telefon"
                            rules={[{ required: true, message: "Telefonni kiriting" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="region"
                            label="Viloyat"
                            rules={[{ required: true, message: "Viloyatni kiriting" }]}
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

export default Executors;