import React, { useEffect } from "react";
import AdminWrapper from "@/app/pages/Wrappers/AdminPanel/Wrapper";
import ItemCard from "@/app/components/ItemCard/ItemCard";
import Tabs from "@/app/components/Tabs/Tabs";
import PageHeader from "@/app/components/PageHeader/PageHeader";
import Button from "@/app/components/Button/Button";
import useAllPlacements from "@/app/hooks/useAlPlacements";
import "./style.scss";
import { useRouter } from "next/router";
import useDeletePlacement from "@/app/hooks/useDeletePlacement";
import { useLoadingContext } from "@/app/context/LoadingContext";

const staticTabs = ["Rooms", "Users", "Bookings"];

const itemLabels = [
  {
    labelPath: "title",
    label: "Название",
  },
  {
    labelPath: "city.title",
    label: "Адрес",
  },
  {
    labelPath: "rating",
    label: "Рейтинг",
  },
  {
    labelPath: "phone",
    label: "Телефон",
  },

  {
    labelPath: "created_at",
    label: "Дата создания",
  },
];

const Page = () => {
  const [currentTab, setCurrentTab] = React.useState(staticTabs[0]);

  const router = useRouter();

  const deletePlacement = useDeletePlacement();

  const { data, isLoading: isLoadingPlacements } = useAllPlacements({});

  const PageHeaderProps = {
    buttons: [
      <Button
        onClick={() => {
          router.push("/admin-panel/hotel/placements/add");
        }}
        size="sm"
        color="primary"
      >
        Добавить
      </Button>,
    ],
    title: "Места размещения",
    goBack: false,
  };

  const { isLoading, setIsLoading } = useLoadingContext();

  useEffect(() => {
    setIsLoading(isLoadingPlacements);
  }, [isLoadingPlacements]);

  return (
    <AdminWrapper>
      <>
        <PageHeader {...PageHeaderProps} />
        {/* <Tabs
          currentTab={currentTab}
          tabs={staticTabs}
          setCurrentTab={setCurrentTab}
        /> */}
        <div className="placements-container">
          {!isLoadingPlacements && data ? (
            data.length > 0 ? (
              data?.map((placement) => (
                <ItemCard
                  key={placement.id}
                  item={placement}
                  labelPaths={itemLabels}
                  actions={{
                    edit: () => {
                      router.push(
                        `/admin-panel/hotel/placements/edit/${placement.id}`
                      );
                    },
                    delete: () => {
                      deletePlacement.mutate(placement.id);
                    },
                    view: () => {
                      router.push(
                        `/admin-panel/hotel/placements/${placement.id}`
                      );
                    },
                  }}
                />
              ))
            ) : (
              <p>Мест размещения пока нету. Добавьте новое место размещения.</p>
            )
          ) : null}
        </div>
      </>
    </AdminWrapper>
  );
};

export default Page;
