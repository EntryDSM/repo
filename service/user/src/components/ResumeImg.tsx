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
    src && src.startsWith("image")
      ? "https://s3.ap-northeast-2.amazonaws.com/dsm-repo/" + src
      : "";
  return (
    <>
      {filterSrc ? (
        <Image
          src={filterSrc}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority
        />
      ) : (
        <div
          style={{ width: width, height: height }}
          className="bg-gray100"
        ></div>
      )}
    </>
  );
};
