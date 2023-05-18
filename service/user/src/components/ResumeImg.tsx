interface PropsType {
  src?: string;
  alt?: string;
  className?: string;
}

export const ResumeImg = ({ src, alt, className }: PropsType) => {
  const filterSrc = src?.startsWith("image")
    ? "https://s3.ap-northeast-2.amazonaws.com/file.dsm-repo.com/"
    : "";
  console.log(filterSrc, src);
  return <img src={filterSrc + src} alt={alt} className={className}></img>;
};
