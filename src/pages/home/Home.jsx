import React from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { Divider } from 'antd';
import AccordionSection from "./toggle/AccordionSection";
import TodoList from "./todolist/ToDoList";
import LineChart from './linechart/Line';
import StatsProgressBars from './progressBar/ProgressBar';

const Home = () => {
  return (
    <div>
      <Breadcrumbs />
      <div className="px-6 py-6">
        <h1 className="text-3xl text-gray-500 mb-4">Bosh sahifa</h1>
        <Divider />
        <LineChart/>
        <Divider />
        <div className='flex mt-[20px] gap-10'>
          <div className='w-[50%] flex flex-col gap-6'>
            <TodoList/>
            <StatsProgressBars/>
          </div>
          <div className='w-[50%]'>
            <AccordionSection/>
          </div>
        </div>

      </div>
    </div >
  );
};

export default Home;