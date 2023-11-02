import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const withAuth =
  (getServerSidePropsFunc?: GetServerSideProps) =>
  async (context: GetServerSidePropsContext) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    if (getServerSidePropsFunc) {
      return await getServerSidePropsFunc(context);
    }

    return { props: {} };
  };
