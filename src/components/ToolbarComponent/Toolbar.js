import React from "react";
import moment from "moment";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Toolbar.css"; 

const Toolbar = (toolbar) => {
    const goToBack = () => {
      toolbar.onNavigate('PREV');
    };
  
    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };
  
    const goToCurrent = () => {
      toolbar.onNavigate('TODAY');
    };
  
    const getMiddleButtonText = () => {
      switch (toolbar.view) {
        case 'month':
          return 'This Month';
        case 'week':
          return 'This Week';
        case 'day':
          return 'Today';
        default:
          return 'Today';
      }
    };
  
    const getWeekNumber = () => {
      if (toolbar.view === 'week') {
        const currentDate = moment(toolbar.date);
        return ` (Week ${currentDate.week()} of ${currentDate.year()})`;
      }
      return '';
    };
  
    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button type="button" onClick={goToBack}><FaChevronLeft /></button>
          <button 
            type="button" 
            onClick={goToCurrent} 
            className="middle-button" // add the class name 
          >
            {getMiddleButtonText()}
          </button>
          <button type="button" onClick={goToNext}><FaChevronRight /></button>
        </span>
        <span className="rbc-toolbar-label">
          {toolbar.label}{getWeekNumber()}
        </span>
        <span className="rbc-btn-group">{toolbar.views.map(name => (
          <button type="button" key={name} className={toolbar.view === name ? 'rbc-active' : ''} onClick={() => toolbar.onView(name)}>
            {name}
          </button>
        ))}</span>
      </div>
    );
  };
  

export default Toolbar;