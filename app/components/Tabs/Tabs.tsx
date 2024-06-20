import React from "react";

interface TabsProps {
  currentTab: string;
  tabs: string[];
  setCurrentTab: (tab: string) => void;
}
import "./style.scss";

const Tabs: React.FC<TabsProps> = ({ currentTab, tabs, setCurrentTab }) => {
  return (
    <div className="tabs-container">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`tab-item ${currentTab === tab ? "active" : ""}`}
          onClick={() => setCurrentTab(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
