import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import { FaHome } from 'react-icons/fa';
import { CgChevronRight } from 'react-icons/cg';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const routeNames = {
    '/dashboard': 'Bosh sahifa',
    '/administrators': 'Administratorlar',
    '/uzkomnazorats': 'DAI',
    '/migrations': 'Migratsiya',
    '/regions': 'Hududlar',
    '/roles': 'Rollar',
    '/sources': 'Manba',
    '/subjects': "Sub'ektlar",
    '/organizations': 'Vakolatli organlar',
    '/resolutions': 'Rezolutsiyalar',
    '/response-letters': 'Javob xatlari',
    '/ticket-types': 'Murojaat turi',
    '/shapes': 'Shapes',
    '/results': 'Natija',
    '/reprisals': "Ko'rilgan choralar",
    '/references': 'Spravochnik',
    '/references_mobile': 'Mobile Reference',
    '/operators': 'Operatorlar',
    '/operator-groups': 'Operatorlar guruhi',
    '/executors': 'Ijrochilar',
    '/executor-groups': 'Ijrochilar guruhi',
    '/addresses': 'Manzillar',
    '/users': 'Foydalanuvchilar',
    '/languages': 'Tillar',
};

const Breadcrumbs = () => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <Layout style={{ padding: '0 20px', backgroundColor: 'white' }}>
            <Breadcrumb
                items={[
                    {
                        title: (
                            <span className="flex items-center gap-2 flex-wrap">
                                <Link to="/dashboard" className="flex items-center btn-block">
                                    <FaHome />
                                </Link>
                                <CgChevronRight />
                                <span className="flex items-center">{routeNames[path] || 'Sahifa'}</span>
                            </span>
                        ),
                    },
                ]}
                style={{
                    margin: '16px 0',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
            />
        </Layout>
    );
};

export default Breadcrumbs;