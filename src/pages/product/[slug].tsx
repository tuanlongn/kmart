import { NextPage } from "next";
import { useRouter } from "next/router";

interface Props {
  //
}

const ProductPage: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { slug } = router.query;

  return <div>ProductPage: {slug}</div>;
};

export default ProductPage;
