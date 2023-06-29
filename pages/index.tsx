import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import styels from "./index.module.css";

// GetServerSidePropsから渡されるPropsの型
type Props = {
  intialImageUrl: string;
};

const IndexPage: NextPage<Props> = ({ intialImageUrl }) => {
  // ❶ useStateを使って状態を定義する
  const [imageUrl, setImageUrl] = useState(intialImageUrl);
  const [loading, setLoading] = useState(false);
  // ❷ マウント時に画像を読み込む宣言
  // useEffect(() => {
  //   fetchImage().then((newImage) => {
  //     setImageUrl(newImage.url);
  //     setLoading(false);
  //   });
  // }, []);
  // ❸ ローディング中でなければ、画像を表示する
  // ボタンで画像読み込み処理
  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  };
  return (
    <div className={styels.page}>
      <button onClick={handleClick} className={styels.button}>他のにゃんこも見る</button>
      <div className={styels.frame}>{loading || <img src={imageUrl} className={styels.img} />}</div>
    </div>
  )
};
export default IndexPage;

// サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      intialImageUrl: image.url,
    },
  };
};

type Image = {
  url: string;
};
const fetchImage = async (): Promise<Image>  => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};

// デベロッパーツールよりconsole確認
// fetchImage();