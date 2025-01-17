import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MainLayout from "../../src/components/layout/MainLayout";
import ProductDetails from "../../src/components/product-details/ProductDetails";
import { useSelector } from "react-redux";
import SEO from "../../src/components/seo";
import CustomContainer from "../../src/components/container";
import useScrollToTop from "api-manage/hooks/custom-hooks/useScrollToTop";

const Index = ({ configData, productDetailsData, landingPageData }) => {
  useScrollToTop();
  const { cartList, campaignItem } = useSelector((state) => state.cart);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    handleProductDetails();
  }, [productDetailsData, cartList]);

  const handleProductDetails = () => {
    if (productDetailsData) {
      if (cartList?.length > 0) {
        const isExist = cartList?.find(
          (item) => item?.id === productDetailsData?.id
        );

        if (isExist) {
          let tempData = {
            ...isExist,
            store_details: productDetailsData?.store_details,
          };
          setProductDetails([tempData]);
        } else {
          setProductDetails([productDetailsData]);
        }
      } else {
        setProductDetails([productDetailsData]);
      }
    } else {
      //productDetailsData only be null if this page is for campaign
      setProductDetails([{ ...campaignItem, isCampaignItem: true }]);
    }
  };
  return (
    <>
      <CssBaseline />
      <SEO
        title={
          configData
            ? `${productDetailsData?.name || productDetails[0]?.name}`
            : "Loading..."
        }
        image={`${configData?.base_urls?.item_image_url}/${productDetailsData?.image}`}
        businessName={configData?.business_name}
        description={`${productDetailsData?.description}`}
        configData={configData}
      />
      <MainLayout configData={configData} landingPageData={landingPageData}>
        <CustomContainer>
          {productDetails.length > 0 && (
            <ProductDetails
              productDetailsData={productDetails[0]}
              configData={configData}
            />
          )}
        </CustomContainer>
      </MainLayout>
    </>
  );
};

export default Index;
export const getServerSideProps = async (context) => {
  const { req } = context;
  const language = req.cookies.languageSetting;
  const configRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`,
    {
      method: "GET",
      headers: {
        "X-software-id": 33571750,
        "X-server": "server",
        origin: process.env.NEXT_CLIENT_HOST_URL,
        "X-localization": language,
      },
    }
  );
  const config = await configRes.json();
  const productId = context.query.id;
  const moduleId = context.query.module_id;
  const productType = context.query?.product_type;
  let productDetails = null;
  let productDetailsData = null;
  if (!productType) {
    productDetails = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/items/details/${productId}`,
      {
        method: "GET",
        headers: {
          moduleId: moduleId,
          "X-localization": language,
        },
      }
    );
    productDetailsData = await productDetails.json();
  }
  const landingPageRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/react-landing-page`,
    {
      method: "GET",
      headers: {
        "X-software-id": 33571750,
        "X-server": "server",
        origin: process.env.NEXT_CLIENT_HOST_URL,
        "X-localization": language,
      },
    }
  );
  const landingPageData = await landingPageRes.json();

  return {
    props: {
      configData: config,
      productDetailsData: !productType ? productDetailsData : null,
      landingPageData: landingPageData,
    },
  };
};
