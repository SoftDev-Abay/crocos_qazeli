import React, { useEffect } from "react";
import AdminWrapper from "@/app/pages/Wrappers/AdminPanel/Wrapper";
import useRoom from "@/app/hooks/useRoom";
import { GetServerSideProps } from "next";
import Button from "@/app/components/Button/Button";
import PageHeader from "@/app/components/PageHeader/PageHeader";
import Card from "@/app/components/Card/Card";
import "./style.scss";
import EditIcon from "@/app/icons/EditIcon";
// I need icons: arrow left cirlce, arrow right cirlce, coffee cup, close square, fine, and some kind of icon for displaing the room square
import SwiperGallery from "@/app/components/SwiperGallery/SwiperGallery";
import HtmlRenderer from "@/app/components/HtmlRenderer/HtmlRenderer";
import {
  FaSmokingBan,
  FaCoffee,
  FaMoneyBill,
  FaTimesCircle,
  FaSquare,
} from "react-icons/fa";

import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/router";
import usePlacement from "@/app/hooks/usePlacement";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useLoadingContext } from "@/app/context/LoadingContext";
export const getServerSideProps: GetServerSideProps = async (context) => {
  let recordData;

  try {
    const { slug } = context.params as { slug: string };

    return {
      props: {
        placementId: Number(slug),
      },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      props: {
        record: null,
      },
    };
  }
};

const Page = ({ placementId }: { placementId: number }) => {
  const {
    data,
    error,
    isLoading: isLoadingPlacement,
  } = usePlacement(placementId);

  const router = useRouter();

  const PageHeaderProps = {
    buttons: [
      <Button
        onClick={() => {
          router.push(`/admin-panel/hotel/placements/add`);
        }}
        size="sm"
        color="primary"
      >
        Добавить
      </Button>,
    ],
    title: "Места размещения",
    goBack: true,
  };

  const defaultValue = "Не указано";

  const { setIsLoading } = useLoadingContext();

  useEffect(() => {
    setIsLoading(isLoadingPlacement);
  }, [isLoadingPlacement]);

  console.log(data);

  return (
    <AdminWrapper>
      <>
        <PageHeader {...PageHeaderProps} />
        <Card padding="padding-small">
          <div className="view-placement-wrapper">
            {!isLoadingPlacement ? (
              data ? (
                <>
                  <div className="gallery-container">
                    <SwiperGallery
                      images={data.ru.gallery_images.map((image) => image.path)}
                    />
                  </div>
                  <div className="view-room-info-container">
                    <div className="view-room-heading">
                      <h1>{data.ru.title}</h1>

                      <div className="stars-wrapper">
                        {Array.from({ length: 5 }, (_, index) => {
                          if (index < data.ru.rating) {
                            return (
                              <FaStar
                                width={"30px"}
                                height={"30px"}
                                key={index}
                              />
                            );
                          }
                          return (
                            <FaRegStar
                              width={"30px"}
                              height={"30px"}
                              key={index}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div className="contact-info">
                      <span>{data.ru.email}</span>

                      <span>{data.ru.phone}</span>
                    </div>

                    <div className="address">
                      {data.ru.city.title}, {data.ru.region.title}
                    </div>

                    <Link
                      className="edit-link-wrappper"
                      href={`/admin-panel/hotel/placements/edit/${placementId}`}
                    >
                      <EditIcon color="#156cbd" width={20} height={20} />
                      <span>Редактировать</span>
                    </Link>

                    <div className="view-room-content">
                      <div className="regular-info-block">
                        <p className="label">Удобства номера</p>
                        <p className="value">
                          {data.ru?.comforts[0]?.title || defaultValue}
                        </p>
                      </div>
                      <div className="regular-info-block">
                        <p className="label">Питание</p>
                        <p className="value">
                          {data.ru?.food_types[0]?.title || defaultValue}
                        </p>
                      </div>
                      <div className="regular-info-block">
                        <p className="label">Количество номеров всего</p>
                        <p className="value">
                          {data.ru?.rooms?.length || defaultValue}
                        </p>
                      </div>

                      <div className="description-block">
                        <p className="label">Описание</p>
                        {data.ru.description && (
                          <HtmlRenderer
                            className="description"
                            unsafeHtml={data.ru.description}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div>No placement with such id exists.</div>
              )
            ) : null}
          </div>
        </Card>
      </>
    </AdminWrapper>
  );
};

export default Page;
