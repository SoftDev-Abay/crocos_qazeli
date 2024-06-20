import React from "react";
import Card from "@/app/components/Card/Card";
import PageHeader from "@/app/components/PageHeader/PageHeader";
import AdminWrapper from "@/app/pages/Wrappers/AdminPanel/Wrapper";
import InputGroup from "@/app/components/InputGroup/InputGroup";
import Input from "@/app/components/Input/Input";
import "./style.scss";

import "../../../../../styles/global.scss";

const Page = () => {
  return (
    <AdminWrapper>
      <div className="rooms-add-page">
        <PageHeader title="Добавить номер" goBack={true} />
        <Card>
          <div className="form-card-content">
            <div className="form-header">Добавление нового номера</div>
            <form action="">
              <InputGroup label="Название номера">
                <Input className="admin-panel-input" />
              </InputGroup>
              <InputGroup label="Название номера">
                <Input className="admin-panel-input" />
              </InputGroup>
              <InputGroup label="Название номера">
                <Input className="admin-panel-input" />
              </InputGroup>
            </form>
          </div>
        </Card>
      </div>
    </AdminWrapper>
  );
};

export default Page;
