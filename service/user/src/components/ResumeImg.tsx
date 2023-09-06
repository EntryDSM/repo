import Image from "next/image";

interface PropsType {
  src?: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
}

export const ResumeImg = ({
  src,
  alt,
  className,
  width,
  height,
}: PropsType) => {
  const filterSrc =
    src && "https://s3.ap-northeast-2.amazonaws.com/dsm-repo/" + src
  console.log(filterSrc, src);
  return (
    <Image
      src={filterSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
    ></Image>
  );
};
